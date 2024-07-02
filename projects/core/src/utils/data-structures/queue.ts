// Queue
// --------------------------------------------------------------------------
// Description: Collection of elements with FIFO (First In First Out) order, where elements are inserted at the end and removed from the front.
// --------------------------------------------------------------------------
// Complexity:
// •	Enqueue: O(1) Insertion
// •	Dequeue: O(1) Deletion
// •	Peek: O(1) Viewing the front element
// •	Search: O(n) Search
// •	Memory: O(n)
// --------------------------------------------------------------------------
// When to use: Useful when you need to store elements in a FIFO order like BFS (breadth-first search).
// --------------------------------------------------------------------------
// Example code:
export class Queue<T> {
  private items: T[] = [];

  public enqueue(item: T): void {
    this.items.push(item);
  }

  public dequeue(): T | undefined {
    return this.items.shift();
  }

  public peek(): T | undefined {
    return this.items[0];
  }

  public search(value: T): number {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === value) {
        return i;
      }
    }
    return -1;
  }
}
