// AVL Tree
// --------------------------------------------------
// Description: Self-balancing binary search tree where the height of the two child subtrees of any node differs by at most one.
// --------------------------------------------------
// Complexity:
// •	Search: O(log n)
// •	Insertion: O(log n)
// •	Deletion: O(log n)
// •	Memory: O(n)
// --------------------------------------------------
// When to use: Useful when you need to search, insert and delete elements frequently and you need to keep the tree balanced to avoid performance degradation.
// --------------------------------------------------
// Example code:

import { IBinaryTreeNode } from './i-binary-tree-node';

export class AVLTreeNode<T> implements IBinaryTreeNode<T> {

  public left: AVLTreeNode<T> | null = null;

  public right: AVLTreeNode<T> | null = null;

  public height: number = 1; // Height of the node

  public count: number = 1; // Number of times the value is present in the tree

  constructor(public value: T) {}
}

export class AVLTree<T> {

  private root: AVLTreeNode<T> | null;

  private readonly compare: (a: T, b: T) => number;

  constructor(root: AVLTreeNode<T> | null = null, compare: (a: T, b: T) => number) {
    this.root = root;
    this.compare = compare;
  }

  public insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> {
    if (!node) {
      return new AVLTreeNode(value);
    }

    const compare = this.compare(value, node.value);
    if (compare < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (compare > 0) {
      node.right = this.insertNode(node.right, value);
    } else {
      node.count++;
      return node;
    }

    return this.reBalance(node);
  }

  private reBalance(node: AVLTreeNode<T>): AVLTreeNode<T> {
    this.updateHeight(node);

    const balance = this.balanceFactor(node);

    if (balance > 1 && this.balanceFactor(node.left!) >= 0) {
      return this.rotateRight(node);
    }

    if (balance > 1 && this.balanceFactor(node.left!) < 0) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    if (balance < -1 && this.balanceFactor(node.right!) <= 0) {
      return this.rotateLeft(node);
    }

    if (balance < -1 && this.balanceFactor(node.right!) > 0) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  private updateHeight(node: AVLTreeNode<T>): void {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  private getHeight(node: AVLTreeNode<T> | null): number {
    return node ? node.height : 0;
  }

  private balanceFactor(node: AVLTreeNode<T>): number {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private rotateRight(y: AVLTreeNode<T>): AVLTreeNode<T> {
    const x = y.left!;
    y.left = x.right;
    x.right = y;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  private rotateLeft(x: AVLTreeNode<T>): AVLTreeNode<T> {
    const y = x.right!;
    x.right = y.left;
    y.left = x;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }


  public delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> | null {
    if (!node) {
      return node;
    }

    const compare = this.compare(value, node.value);
    if (compare < 0) {
      node.left = this.deleteNode(node.left, value);
    } else if (compare > 0) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (node.count > 1) {
        node.count--;
        return node;
      }
      if (!node.left || !node.right) {
        node = node.left || node.right;
      } else {
        let temp = this.getMinValueNode(node.right);
        node.value = temp.value;
        node.count = temp.count;
        temp.count = 1;
        node.right = this.deleteNode(node.right, temp.value);
      }
    }

    if (!node) return node;
    return this.reBalance(node);
  }

  private getMinValueNode(node: AVLTreeNode<T>): AVLTreeNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  public getList(): T[] {
    const result: T[] = [];
    this.inorderTraverse(this.root, result);
    return result;
  }

  private inorderTraverse(node: AVLTreeNode<T> | null, result: T[]): void {
    if (!node) return;
    this.inorderTraverse(node.left, result);
    for (let i = 0; i < node.count; i++) {
      result.push(node.value);
    }
    this.inorderTraverse(node.right, result);
  }
}



