// Deque
// ----------------------------------------------------------------------
// Description: A double-ended queue that allows adding and removing elements from both ends.
// ----------------------------------------------------------------------
// Complexity:
// •	Push: O(1) Insertion
// •	Pop: O(1) Deletion
// •	Peek: O(1) View the first or last element
// •	Search: O(n) Search
// •	Memory: O(n)
// ----------------------------------------------------------------------
// When to use: Useful when you need to store elements and need to access them from both ends, for example in tasks with a sliding window.
// ----------------------------------------------------------------------
// Example code:
export class Deque<T> {
  private items: T[] = [];

  public pushFront(item: T): void {
    this.items.unshift(item);
  }

  public pushBack(item: T): void {
    this.items.push(item);
  }

  public popFront(): T | undefined {
    return this.items.shift();
  }

  public popBack(): T | undefined {
    return this.items.pop();
  }

  public peekFront(): T | undefined {
    return this.items[0];
  }

  public peekBack(): T | undefined {
    return this.items[this.items.length - 1];
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
