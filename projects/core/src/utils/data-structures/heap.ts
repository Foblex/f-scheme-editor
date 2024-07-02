// Heap
// --------------------------------------------------------------------------
// Description: A partially ordered binary tree that each node is less than or greater than its children.
// --------------------------------------------------------------------------
// Complexity:
// •	Search: min/max element O(1), other O(n)
// •	Insertion: O(log n)
// •	Deletion: O(log n)
// •	Memory: O(1)
// --------------------------------------------------------------------------
// When to use: Useful when you need to find the min/max element frequently or when you need to find the kth smallest/largest element.
// --------------------------------------------------------------------------
// Example code:

export class Heap<T> {

  constructor(public data: T[] = []) {
  }

  public insert(value: T): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  public delete(value: T): void {
    const index = this.data.indexOf(value);
    if (index === -1) {
      return;
    }
    this.data[index] = this.data[this.data.length - 1];
    this.data.pop();
    this.bubbleDown(index);
  }

  public extractMin(): T | null {
    if (this.data.length === 0) {
      return null;
    }
    const min = this.data[0];
    this.data[0] = this.data[this.data.length - 1];
    this.data.pop();
    this.bubbleDown(0);
    return min;
  }

  public extractMax(): T | null {
    if (this.data.length === 0) {
      return null;
    }
    let maxIndex = 0;
    for (let i = 1; i < this.data.length; i++) {
      if (this.data[i] > this.data[maxIndex]) {
        maxIndex = i;
      }
    }
    const max = this.data[maxIndex];
    this.data[maxIndex] = this.data[this.data.length - 1];
    this.data.pop();
    this.bubbleDown(maxIndex);
    return max;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] >= this.data[parentIndex]) {
        break;
      }
      [this.data[index], this.data[parentIndex]] = [this.data[parentIndex], this.data[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let swapIndex = index;
      if (leftIndex < this.data.length && this.data[leftIndex] < this.data[swapIndex]) {
        swapIndex = leftIndex;
      }
      if (rightIndex < this.data.length && this.data[rightIndex] < this.data[swapIndex]) {
        swapIndex = rightIndex;
      }
      if (swapIndex === index) {
        break;
      }
      [this.data[index], this.data[swapIndex]] = [this.data[swapIndex], this.data[index]];
      index = swapIndex;
    }
  }

  public getMin(): T | null {
    return this.data.length === 0 ? null : this.data[0];
  }

  public getMax(): T | null {
    if (this.data.length === 0) {
      return null;
    }
    let max = this.data[0];
    for (let i = 1; i < this.data.length; i++) {
      if (this.data[i] > max) {
        max = this.data[i];
      }
    }
    return max;
  }

  public size(): number {
    return this.data.length;
  }
}

