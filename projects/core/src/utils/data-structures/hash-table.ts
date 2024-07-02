// Hash Table
// ----------------------------------------------------------------------
// Description: Structure that provides access to data using keys through a hash function.
// Hash function - function that converts a key into an index in the hash table and always returns the same index for the same key.
// ----------------------------------------------------------------------
// Complexity:
// •	Access: O(1)
// •	Insertion: O(1)
// •	Deletion: O(1)
// •	Memory: O(n)
// ----------------------------------------------------------------------
// When to use: Useful when you need to store key-value pairs and access them by key, for example in databases or caches.
// ----------------------------------------------------------------------
// Example code:
export class HashTable<K, V> {
  private items: { [index: string] : V } = {};

  private hash(key: K): string {
    return JSON.stringify(key);
  }

  public set(key: K, value: V): void {
    this.items[this.hash(key)] = value;
  }

  public get(key: K): V | undefined {
    return this.items[this.hash(key)];
  }

  public delete(key: K): void {
    delete this.items[this.hash(key)];
  }
}

function getHash(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash;
}
