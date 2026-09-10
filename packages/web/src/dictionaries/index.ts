import { LEVELS } from "../enums/settings";
import { read, write, STORES } from "../lib/idb";
import {
  createDictionaryLoader,
  type DeckCache,
  type DeckSource,
} from "./createLoader";

const LANGUAGE = "ru";
const REVISION = 1;

/** Decks are served as static files from public/dictionaries. */
const source: DeckSource = async (level, language) => {
  const response = await fetch(`/dictionaries/${language}/${level}.json`);

  if (!response.ok) {
    throw new Error(`Dictionary ${level} responded ${response.status}`);
  }

  return response.json();
};

const cache: DeckCache = {
  read: (key) => read<string[]>(STORES.dictionaries, key),
  write: (key, words) => write(STORES.dictionaries, key, words),
};

const loader = createDictionaryLoader({
  source,
  cache,
  language: LANGUAGE,
  revision: REVISION,
});

/**
 * Words for one difficulty level. Served from the cache when the deck has been
 * seen before, which is what lets a game start with no network at all.
 */
export function loadWords(level: LEVELS): Promise<string[]> {
  return loader.loadWords(level);
}

export { shuffle } from "./createLoader";
export type { DeckCache, DeckSource } from "./createLoader";
