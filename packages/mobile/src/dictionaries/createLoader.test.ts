import { LEVELS } from '../enums/settings';
import {
  createDictionaryLoader,
  type DeckCache,
  shuffle,
} from './createLoader';

describe('shuffle', () => {
  it('keeps every item, only reordering them', () => {
    const items = ['fox', 'owl', 'cat', 'dog'];

    const result = shuffle(items);

    expect(result).toHaveLength(items.length);
    expect([...result].sort()).toEqual([...items].sort());
  });

  it('does not mutate the source array', () => {
    const items = ['fox', 'owl', 'cat'];

    shuffle(items);

    expect(items).toEqual(['fox', 'owl', 'cat']);
  });
});

function createMemoryCache(): DeckCache {
  const store = new Map<string, string[]>();

  return {
    read: async (key) => store.get(key),
    write: async (key, words) => {
      store.set(key, words);
    },
  };
}

describe('createDictionaryLoader', () => {
  it('fetches from the source and caches the result', async () => {
    const source = jest.fn(async () => ['fox', 'owl']);
    const cache = createMemoryCache();
    const loader = createDictionaryLoader({
      source,
      cache,
      language: 'ru',
      revision: 1,
    });

    const words = await loader.loadWords(LEVELS.easy);

    expect(words).toEqual(['fox', 'owl']);
    expect(source).toHaveBeenCalledTimes(1);
    await expect(cache.read('ru:easy:1')).resolves.toEqual(['fox', 'owl']);
  });

  it('serves from the cache without calling the source again', async () => {
    const source = jest.fn(async () => ['fox', 'owl']);
    const cache = createMemoryCache();
    const loader = createDictionaryLoader({
      source,
      cache,
      language: 'ru',
      revision: 1,
    });

    await loader.loadWords(LEVELS.easy);
    await loader.loadWords(LEVELS.easy);

    expect(source).toHaveBeenCalledTimes(1);
  });

  it('shares one in-flight request between concurrent callers', async () => {
    const source = jest.fn(async () => ['fox', 'owl']);
    const loader = createDictionaryLoader({
      source,
      cache: createMemoryCache(),
      language: 'ru',
      revision: 1,
    });

    const [first, second] = await Promise.all([
      loader.loadWords(LEVELS.easy),
      loader.loadWords(LEVELS.easy),
    ]);

    expect(first).toEqual(second);
    expect(source).toHaveBeenCalledTimes(1);
  });

  it('keys the cache by level, so decks do not bleed into each other', async () => {
    const source = jest.fn(async (level: LEVELS) => [level]);
    const loader = createDictionaryLoader({
      source,
      cache: createMemoryCache(),
      language: 'ru',
      revision: 1,
    });

    const easy = await loader.loadWords(LEVELS.easy);
    const pro = await loader.loadWords(LEVELS.pro);

    expect(easy).toEqual([LEVELS.easy]);
    expect(pro).toEqual([LEVELS.pro]);
  });
});
