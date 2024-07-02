// Single Linked List
// ------------------------------------------------------------------------------------------------
// Description: Contains a sequence of elements where each element links to the next element in the list.
// ------------------------------------------------------------------------------------------------
// Complexity:
// •	Access by index: O(n)
// •	Search: O(n)
// •	Insertion: O(1) in the start of the list, O(n) in the worst case
// •	Deletion: O(1) in the start of the list, O(n) in the worst case
// •	Memory: O(n)
// ------------------------------------------------------------------------------------------------
// When to use: Useful when you need to insert and delete elements frequently and the order of the elements matter.

// Example code:
export class SingleLinkedListNode<T> {
  constructor(public value: T, public next: SingleLinkedListNode<T> | null = null) {}
}

export class SingleLinkedList<T> {

  constructor(public head: SingleLinkedListNode<T> | null = null) {
  }

  public search(value: T): SingleLinkedListNode<T> | null {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  public insert(value: T): void {
    const newNode = new SingleLinkedListNode(value);

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (current.next !== null) {
      current = current.next;
    }

    current.next = newNode;
  }

  public delete(value: T): void {
    if (this.head === null) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    while (current.next !== null) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }
}
