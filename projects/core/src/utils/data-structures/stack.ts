// Stack
// --------------------------------------------------------------------------
// Description: Collection of elements working on the principle of Last In First Out (LIFO).
// --------------------------------------------------------------------------
// Complexity:
// •	Push: O(1) Вставка
// •	Pop: O(1) Удаление
// •	Peek: O(1) Просмотр верхнего элемента
// •	Search: O(n) Поиск
// •	Memory: O(n)
// --------------------------------------------------------------------------
// When to use: Useful when you need to store elements in a LIFO order like DFS(глубокий поиск) or backtracking(возврат к предыдущему шагу).
// --------------------------------------------------------------------------
// Example code:
export class Stack<T> {
  private items: T[] = [];

  public push(item: T): void {
    this.items.push(item);
  }

  public pop(): T | undefined {
    return this.items.pop();
  }

  public peek(): T | undefined {
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
