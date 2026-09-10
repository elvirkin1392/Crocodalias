import { LEVELS } from "../enums/settings";

/**
 * Where a deck comes from when it is not cached yet. On the web this is a
 * fetch from /dictionaries; on React Native it will be a bundled `require`,
 * since the JSON ships inside the app.
 */
export type DeckSource = (level: LEVELS, language: string) => Promise<string[]>;

/**
 * Where a fetched deck is kept so the next game starts without a network.
 * IndexedDB on the web, AsyncStorage or SQLite on React Native. Both methods
 * may fail silently — a miss and an error are treated the same way.
 */
export type DeckCache = {
  read(key: string): Promise<string[] | undefined>;
  write(key: string, words: string[]): Promise<void>;
};

type LoaderOptions = {
  source: DeckSource;
  cache: DeckCache;
  language: string;
  /**
   * Bump when the generated decks change, so clients holding an old copy in
   * their cache fetch the new one instead of serving it forever.
   */
  revision: number;
};

export type DictionaryLoader = {
  loadWords(level: LEVELS): Promise<string[]>;
};

/**
 * Platform-free deck loading: cache first, source second, one request per
 * deck at a time. Everything that touches a browser or a device is injected,
 * so the same logic serves both the web build and the native app.
 */
export function createDictionaryLoader({
  source,
  cache,
  language,
  revision,
}: LoaderOptions): DictionaryLoader {
  /**
   * Loads in flight, keyed by deck. Two components asking for the same level
   * at once — or StrictMode running an effect twice — share one request
   * instead of racing each other past the cache.
   */
  const pending = new Map<string, Promise<string[]>>();

  async function resolve(key: string, level: LEVELS): Promise<string[]> {
    const cached = await cache.read(key);

    if (cached?.length) {
      return cached;
    }

    const words = await source(level, language);
    await cache.write(key, words);

    return words;
  }

  return {
    loadWords(level) {
      const key = `${language}:${level}:${revision}`;
      const inFlight = pending.get(key);

      if (inFlight) {
        return inFlight;
      }

      const request = resolve(key, level).finally(() => pending.delete(key));
      pending.set(key, request);

      return request;
    },
  };
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
