/**
 * Minimal IndexedDB wrapper.
 *
 * Storage can be unavailable entirely — private windows, blocked site data,
 * embedded WebViews — so every operation degrades to a no-op instead of
 * throwing. Callers treat a miss and a failure the same way: fetch again.
 */

const DATABASE = "crocodalias";
const VERSION = 1;

export const STORES = {
  dictionaries: "dictionaries",
  game: "game",
} as const;

export type StoreName = (typeof STORES)[keyof typeof STORES];

let database: Promise<IDBDatabase | null> | null = null;

function open(): Promise<IDBDatabase | null> {
  if (database) {
    return database;
  }

  database = new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }

    let request: IDBOpenDBRequest;

    try {
      request = indexedDB.open(DATABASE, VERSION);
    } catch {
      resolve(null);
      return;
    }

    request.onupgradeneeded = () => {
      for (const store of Object.values(STORES)) {
        if (!request.result.objectStoreNames.contains(store)) {
          request.result.createObjectStore(store);
        }
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });

  return database;
}

function run<T>(
  store: StoreName,
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest
): Promise<T | undefined> {
  return open().then(
    (db) =>
      new Promise<T | undefined>((resolve) => {
        if (!db) {
          resolve(undefined);
          return;
        }

        try {
          const request = action(db.transaction(store, mode).objectStore(store));

          request.onsuccess = () => resolve(request.result as T);
          request.onerror = () => resolve(undefined);
        } catch {
          resolve(undefined);
        }
      })
  );
}

export function read<T>(store: StoreName, key: string): Promise<T | undefined> {
  return run<T>(store, "readonly", (objectStore) => objectStore.get(key));
}

export async function write(
  store: StoreName,
  key: string,
  value: unknown
): Promise<void> {
  await run(store, "readwrite", (objectStore) => objectStore.put(value, key));
}

export async function remove(store: StoreName, key: string): Promise<void> {
  await run(store, "readwrite", (objectStore) => objectStore.delete(key));
}
