// Skip List
// ------------------------------------------------------------------------------------------------
// Description: A skip list is a data structure that allows fast search within an ordered sequence of elements.
// ------------------------------------------------------------------------------------------------
// Complexity:
// •	Search: O(log n) in the average case and O(n) in the worst case
// •	Insertion: O(log n) in the average case and O(n) in the worst case
// •	Deletion: O(log n) in the average case and O(n) in the worst case
// •	Memory: O(n)
// ------------------------------------------------------------------------------------------------
// When to use: Useful when you need to search, insert and delete elements frequently
// and you need a data structure that is simpler than a balanced tree.

// Example code:
export class SkipListNode<T> {
  public forward: SkipListNode<T>[] = [];

  constructor(public value: T, level: number) {
    this.forward = Array(level + 1).fill(null);
  }
}

export class SkipList<T> {

  private head: SkipListNode<T>;
  private level = 0;

  constructor(private maxLevel = 16, private probability = 0.5) {
    this.head = new SkipListNode<T>(null!, maxLevel);
  }

  private randomLevel(): number {
    let level = 0;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  public search(value: T): SkipListNode<T> | null {
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value! < value) {
        current = current.forward[i];
      }
    }
    current = current.forward[0];
    if (current && current.value === value) {
      return current;
    }
    return null;
  }

  public insert(value: T): void {
    const update: SkipListNode<T>[] = [];
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value! < value) {
        current = current.forward[i];
      }
      update[i] = current;
    }
    current = current.forward[0];
    if (!current || current.value !== value) {
      const level = this.randomLevel();
      if (level > this.level) {
        for (let i = this.level + 1; i <= level; i++) {
          update[i] = this.head;
        }
        this.level = level;
      }
      const newNode = new SkipListNode<T>(value, level);
      for (let i = 0; i <= level; i++) {
        newNode.forward[i] = update[i].forward[i];
        update[i].forward[i] = newNode;
      }
    }
  }

  public delete(value: T): void {
    const update: SkipListNode<T>[] = [];
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value! < value) {
        current = current.forward[i];
      }
      update[i] = current;
    }
    current = current.forward[0];
    if (current && current.value === value) {
      for (let i = 0; i <= this.level; i++) {
        if (update[i].forward[i] !== current) {
          break;
        }
        update[i].forward[i] = current.forward[i];
      }
      while (this.level > 0 && this.head.forward[this.level] === null) {
        this.level--;
      }
    }
  }

  public print(): void {
    for (let i = this.level; i >= 0; i--) {
      let current = this.head.forward[i];
      const values: T[] = [];
      while (current) {
        values.push(current.value!);
        current = current.forward[i];
      }
      console.log(`Level ${i}: ${values.join(', ')}`);
    }
  }
}
