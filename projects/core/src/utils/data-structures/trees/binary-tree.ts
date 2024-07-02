// Binary tree
// --------------------------------------------------
// Description: Binary tree - structure where each node has two children.
// --------------------------------------------------
// Complexity:
// •	Search: in the worst case O(n) and in the average case O(log n)
// •	Insertion: in the worst case O(n) and in the average case O(log n)
// •	Deletion: in the worst case O(n) and in the average case O(log n)
// •	Memory: O(n)
// --------------------------------------------------
// When to use: Useful when you need to search, insert and delete elements frequently.
// --------------------------------------------------
// Example code:
import { IBinaryTreeNode } from './i-binary-tree-node';

export class BinaryTreeNode<T> implements IBinaryTreeNode<T>{
  public left: BinaryTreeNode<T> | null = null;

  public right: BinaryTreeNode<T> | null = null;

  constructor(public value: T) {}
}

export class BinaryTree<T> {

  constructor(public root: BinaryTreeNode<T> | null = null) {
  }

  public search(value: T): BinaryTreeNode<T> | null {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: BinaryTreeNode<T> | null, value: T): BinaryTreeNode<T> | null {
    if (!node) {
      return null;
    }

    if (node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    }

    return this.searchNode(node.right, value);
  }

  public insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: BinaryTreeNode<T> | null, value: T): BinaryTreeNode<T> {
    if (!node) {
      return new BinaryTreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  public delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: BinaryTreeNode<T> | null, value: T): BinaryTreeNode<T> | null {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      const temp = this.findMinNode(node.right);
      node.value = temp.value;
      node.right = this.deleteNode(node.right, temp.value);
    }

    return node;
  }

  private findMinNode(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }
}
