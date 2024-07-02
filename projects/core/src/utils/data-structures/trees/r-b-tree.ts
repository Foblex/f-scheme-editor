// RBTree
// --------------------------------------------------
// Description: A self-balancing binary search tree where each node has an extra bit for denoting the color of the node.
// --------------------------------------------------
// Complexity:
// •	Search: O(log n)
// •	Insertion: O(log n)
// •	Deletion: O(log n)
// •	Memory: O(n)
// --------------------------------------------------
// When to use: Useful when you need to search, insert and delete elements frequently
// and you need to keep the tree balanced to avoid performance degradation.
// Assotiative arrays, dictionaries, ordered statistics, etc.
// --------------------------------------------------
// Example code:
import { IBinaryTreeNode } from './i-binary-tree-node';

export class RBTreeNode<T> implements IBinaryTreeNode<T> {

  public left: RBTreeNode<T> | null = null;

  public right: RBTreeNode<T> | null = null;

  public color: 'red' | 'black' = 'red'; // Color of the node

  constructor(public value: T) {
  }
}

export class RBTree<T> {

  private root: RBTreeNode<T> | null;

  private compare: (a: T, b: T) => number;

  constructor(root: RBTreeNode<T> | null = null, compare: (a: T, b: T) => number) {
    this.root = root;
    this.compare = compare;
  }

  public insert(value: T): void {
    this.root = this.insertNode(this.root, value);
    if (this.root) {
      this.root.color = 'black';
    }
  }

  private insertNode(node: RBTreeNode<T> | null, value: T): RBTreeNode<T> {
    if (!node) {
      return new RBTreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }

    return this.balance(node);
  }

  private balance(node: RBTreeNode<T>): RBTreeNode<T> {
    if (node.right && node.right.color === 'red') {
      node = this.rotateLeft(node);
    }

    if (node.left && node.left.color === 'red' && node.left.left && node.left.left.color === 'red') {
      node = this.rotateRight(node);
    }

    if (node.left && node.left.color === 'red' && node.right && node.right.color === 'red') {
      this.flipColors(node);
    }

    return node;
  }

  private rotateLeft(node: RBTreeNode<T>): RBTreeNode<T> {
    const rightNode = node.right as RBTreeNode<T>;
    node.right = rightNode.left;
    rightNode.left = node;
    rightNode.color = node.color;
    node.color = 'red';
    return rightNode;
  }

  private rotateRight(node: RBTreeNode<T>): RBTreeNode<T> {
    const leftNode = node.left as RBTreeNode<T>;
    node.left = leftNode.right;
    leftNode.right = node;
    leftNode.color = node.color;
    node.color = 'red';
    return leftNode;
  }

  private flipColors(node: RBTreeNode<T>): void {
    node.color = 'red';
    if (node.left) node.left.color = 'black';
    if (node.right) node.right.color = 'black';
  }

  public result(): T[] {
    const result: T[] = [];
    this.traverse(this.root, result);
    return result;
  }

  private traverse(node: RBTreeNode<T> | null, result: T[]): void {
    if (!node) {
      return;
    }
    this.traverse(node.left, result);
    result.push(node.value);
    this.traverse(node.right, result);
  }
}





