import { LEVELS } from "../enums/settings";
import { read, write, STORES } from "../lib/idb";

/**
 * Bump when the generated decks change shape or content, so browsers holding
 * an old copy in IndexedDB fetch the new one instead of serving it forever.
 */
const REVISION = 1;

const LANGUAGE = "ru";

/**
 * Loads in flight, keyed by deck. Two components asking for the same level at
 * once — or StrictMode running an effect twice — share one request instead of
 * racing each other past the cache.
 */
const pending = new Map<string, Promise<string[]>>();

async function fetchDeck(key: string, level: LEVELS): Promise<string[]> {
  const cached = await read<string[]>(STORES.dictionaries, key);

  if (cached?.length) {
    return cached;
  }

  const response = await fetch(`/dictionaries/${LANGUAGE}/${level}.json`);

  if (!response.ok) {
    throw new Error(`Dictionary ${level} responded ${response.status}`);
  }

  const words: string[] = await response.json();
  await write(STORES.dictionaries, key, words);

  return words;
}

/**
 * Words for one difficulty level. Served from IndexedDB when the deck has been
 * seen before, which is what lets a game start with no network at all.
 */
export function loadWords(level: LEVELS): Promise<string[]> {
  const key = `${LANGUAGE}:${level}:${REVISION}`;
  const inFlight = pending.get(key);

  if (inFlight) {
    return inFlight;
  }

  const request = fetchDeck(key, level).finally(() => pending.delete(key));
  pending.set(key, request);

  return request;
}

/** Fisher-Yates. Returns a new array, leaving the cached deck untouched. */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
