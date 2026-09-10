#!/usr/bin/env node
/**
 * Builds the Russian word decks used by the game.
 *
 * Sources (both CC BY-SA, see DICTIONARIES.md):
 *   - Badestrand/russian-dictionary — noun lemmas with full paradigms
 *   - hermitdave/FrequencyWords     — OpenSubtitles 2018 word counts
 *
 * A lemma's difficulty comes from how often the whole paradigm occurs in
 * speech, not just its nominative form, so "ножницы" is not punished for
 * rarely appearing in the singular.
 *
 * Output: {level}.json in packages/web/public/dictionaries/ru (served as
 * static files) and packages/mobile/src/dictionaries/ru (bundled into the app).
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = join(root, "scripts", ".cache");
const outDirs = [
  join(root, "packages", "web", "public", "dictionaries", "ru"),
  join(root, "packages", "mobile", "src", "dictionaries", "ru"),
];

async function writeToAll(name, content) {
  for (const dir of outDirs) {
    await writeFile(join(dir, name), content);
  }
}

const SOURCES = {
  nouns:
    "https://raw.githubusercontent.com/Badestrand/russian-dictionary/master/nouns.csv",
  frequency:
    "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/ru/ru_50k.txt",
};

const CASE_COLUMNS = [
  "sg_nom", "sg_gen", "sg_dat", "sg_acc", "sg_inst", "sg_prep",
  "pl_nom", "pl_gen", "pl_dat", "pl_acc", "pl_inst", "pl_prep",
];

const LEVELS = ["easy", "medium", "advanced", "pro"];

/**
 * Share of each pool that lands in each level, most frequent first. Concrete
 * nouns fill every level; abstract ones never reach "easy", because "воля" is
 * impossible to act out however common the word is.
 */
const BANDS = {
  concrete: { easy: 0.25, medium: 0.3, advanced: 0.25, pro: 0.2 },
  abstract: { easy: 0, medium: 0.25, advanced: 0.35, pro: 0.4 },
};

/** Russian suffixes that mark abstract nouns — poor cards to act out. */
const ABSTRACT_SUFFIXES = [
  "ость", "есть", "ство", "ствие", "ение", "ание", "ивание", "ывание",
  "изм", "ация", "яция", "енция", "анция", "изна", "щина", "чина",
  "ота", "тие", "тье", "ика", "урс", "аж",
];

/** Substantivised adjectives and participles: "белый", "прошлое", "кошачьи". */
const ADJECTIVE_ENDINGS = ["ый", "ой", "ое", "ее", "ые", "ие", "ьи"];

/** Numerals the source files under nouns. */
const NUMERAL_PATTERN = /^(один|два|три|четыре|пять|шесть|семь|восемь|девять|десять|сорок|сто|тысяча)$|(надцать|десят|сот|дцать)$/;

/** English glosses ending this way describe concepts, not things. */
const ABSTRACT_GLOSS_SUFFIXES = [
  "tion", "sion", "ment", "ness", "ity", "ance", "ence", "ism", "ship",
  "hood", "cy", "ure", "al", "ing",
];

/** Obscene, slur and adult roots. Matched as substrings against the lemma. */
const BLOCKED_ROOTS = [
  "бля", "ебл", "ёбл", "ебан", "ёбан", "ебат", "ёбат", "заеб", "наеб", "поеб",
  "уеб", "хуй", "хуе", "хуё", "хую", "пизд", "муд", "гандон", "гондон",
  "залуп", "дроч", "манда", "пидор", "пидар", "педик", "шлюх", "блядь",
  "сука", "срак", "говн", "дерьм", "жоп", "ссак", "трах", "потаск",
  "жид", "хач", "чурк", "нигг", "даун", "дебил", "олигофрен", "урод",
  "проститу", "минет", "куннилинг", "мастурб", "оргаз", "презерват", "вагин",
  "пенис", "гениталии", "мошонк", "анус", "анальн", "сперм", "эрекц",
  "наркоман", "героин", "кокаин", "суицид", "изнасил", "педофил", "труп",
  "убийц", "убийств", "самоубий", "пытк", "истязан", "садизм", "мазохиз",
  "инцест", "геноцид", "расстрел", "линчев", "порног", "зоофил", "некрофил",
  "работорг", "живодёр", "живодер", "мучитель", "истребл", "резн",
];

/** Reviewed exclusions, see scripts/exclude.txt. */
async function loadExclusions() {
  const text = await readFile(join(root, "scripts", "exclude.txt"), "utf8");

  return new Set(
    text
      .split("\n")
      .map((line) => line.trim().toLowerCase())
      .filter((line) => line && !line.startsWith("#"))
  );
}

/** Measurement abbreviations and leftover function words. */
const BLOCKED_EXACT = new Set([
  "ничего", "нечто", "нечего", "некто", "ничто", "нечистое", "сие", "оно",
  "привет", "пока", "спасибо", "здравствуйте", "алло", "ага", "угу", "ура",
  "раз", "нуль", "ноль", "нужда", "прочее", "должное", "многое", "иное",
  "см", "кг", "км", "мм", "гг", "тб", "гб", "мб",
]);

async function download(name, url) {
  const file = join(cacheDir, name);

  if (existsSync(file)) {
    return readFile(file, "utf8");
  }

  process.stdout.write(`  downloading ${name}… `);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} responded ${response.status}`);
  }

  const text = await response.text();
  await mkdir(cacheDir, { recursive: true });
  await writeFile(file, text);
  console.log(`${(text.length / 1024 / 1024).toFixed(1)} MB`);

  return text;
}

function parseCounts(text) {
  const counts = new Map();

  for (const line of text.split("\n")) {
    const [word, count] = line.split(" ");

    if (word && count) {
      counts.set(word, (counts.get(word) ?? 0) + Number(count));
    }
  }

  return counts;
}

function parseNouns(text) {
  const [header, ...rows] = text.split("\n");
  const columns = header.split("\t");

  return rows
    .filter(Boolean)
    .map((row) =>
      Object.fromEntries(row.split("\t").map((value, i) => [columns[i], value]))
    );
}

const CYRILLIC_WORD = /^[а-яё]+(-[а-яё]+)?$/;

function isPlayable(noun, excluded) {
  const word = noun.bare;

  if (excluded.has(word)) return false;

  if (!word || !CYRILLIC_WORD.test(word)) return false;
  if (word.length < 3 || word.length > 14) return false;
  if (BLOCKED_EXACT.has(word)) return false;
  if (BLOCKED_ROOTS.some((blocked) => word.includes(blocked))) return false;
  // No English gloss means the entry is a stub rather than a real word.
  if (!noun.translations_en?.trim()) return false;
  // Numerals, pronouns and particles are filed as nouns but carry no gender.
  if (!noun.gender?.trim()) return false;
  if (NUMERAL_PATTERN.test(word)) return false;
  if (ADJECTIVE_ENDINGS.some((ending) => word.endsWith(ending))) return false;
  // A capitalised gloss ("Belgium", "Felidae") marks a proper or taxonomic name.
  if (/^[A-Z]/.test(noun.translations_en.trim())) return false;

  return true;
}

/** Every surface form of the lemma, with the source's accent marks removed. */
function formsOf(noun) {
  const forms = new Set([noun.bare]);

  for (const column of CASE_COLUMNS) {
    const value = noun[column]?.replaceAll("'", "").toLowerCase().trim();

    if (value && CYRILLIC_WORD.test(value)) {
      forms.add(value);
    }
  }

  return forms;
}

function isAbstract(noun) {
  if (noun.animate === "1") return false;

  const word = noun.bare;
  if (ABSTRACT_SUFFIXES.some((suffix) => word.endsWith(suffix))) return true;

  const gloss = noun.translations_en.split(/[,;]/)[0].trim().toLowerCase();

  return (
    gloss.split(" ").length === 1 &&
    ABSTRACT_GLOSS_SUFFIXES.some((suffix) => gloss.endsWith(suffix))
  );
}

async function main() {
  console.log("Building Russian dictionaries");

  const [nounsCsv, frequencyTxt] = await Promise.all([
    download("nouns.csv", SOURCES.nouns),
    download("ru_50k.txt", SOURCES.frequency),
  ]);

  const excluded = await loadExclusions();
  const counts = parseCounts(frequencyTxt);
  const nouns = parseNouns(nounsCsv);
  console.log(`  ${nouns.length} noun entries, ${counts.size} counted words`);

  const scored = [];
  const seen = new Set();

  for (const noun of nouns) {
    if (seen.has(noun.bare) || !isPlayable(noun, excluded)) continue;

    let total = 0;

    for (const form of formsOf(noun)) {
      total += counts.get(form) ?? 0;
    }

    // A lemma no form of which occurs in the corpus is not spoken language.
    if (total === 0) continue;

    // Russian paradigms overlap: "вод" is mostly the genitive plural of
    // "вода", so its aggregate is borrowed. Demand that the dictionary form
    // carries a real share of it.
    const own = counts.get(noun.bare) ?? 0;
    if (own / total < 0.15) continue;

    seen.add(noun.bare);
    scored.push({
      word: noun.bare,
      weight: total,
      abstract: isAbstract(noun),
      gloss: noun.translations_en.split(/[,;]/)[0].trim().toLowerCase(),
    });
  }

  // "зала" beside "зал", "метода" beside "метод": archaic twins of a word the
  // language already has. Identical English glosses give them away.
  const glosses = new Map(scored.map((entry) => [entry.word, entry.gloss]));
  const variants = scored.filter(({ word, gloss }) => {
    if (!word.endsWith("а") && !word.endsWith("я")) return false;

    return glosses.get(word.slice(0, -1)) === gloss;
  });

  const dropped = new Set(variants.map((entry) => entry.word));
  console.log(`  dropped ${dropped.size} archaic variants: ` +
    variants.slice(0, 12).map((entry) => entry.word).join(", "));

  const playable = scored.filter((entry) => !dropped.has(entry.word));
  const pools = {
    concrete: playable.filter((entry) => !entry.abstract),
    abstract: playable.filter((entry) => entry.abstract),
  };

  for (const pool of Object.values(pools)) {
    pool.sort((a, b) => b.weight - a.weight);
  }

  console.log(
    `  ${playable.length} playable lemmas ` +
      `(${pools.concrete.length} concrete, ${pools.abstract.length} abstract)`
  );

  for (const dir of outDirs) {
    await mkdir(dir, { recursive: true });
  }

  const index = {
    language: "ru",
    generatedAt: new Date().toISOString().slice(0, 10),
    license: "CC-BY-SA-4.0",
    sources: Object.values(SOURCES),
    levels: {},
  };

  const decks = Object.fromEntries(LEVELS.map((level) => [level, []]));

  for (const [name, pool] of Object.entries(pools)) {
    let start = 0;

    for (const level of LEVELS) {
      const end = start + Math.round(pool.length * BANDS[name][level]);
      decks[level].push(...pool.slice(start, end).map((entry) => entry.word));
      start = end;
    }

    decks.pro.push(...pool.slice(start).map((entry) => entry.word));
  }

  for (const level of LEVELS) {
    const words = decks[level];

    await writeToAll(`${level}.json`, JSON.stringify(words));
    index.levels[level] = words.length;

    console.log(
      `  ${level.padEnd(9)} ${String(words.length).padStart(5)} words  ` +
        `e.g. ${words.slice(0, 5).join(", ")}`
    );
  }

  await writeToAll("index.json", JSON.stringify(index, null, 2));
  console.log(`Written to:\n  ${outDirs.join("\n  ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
