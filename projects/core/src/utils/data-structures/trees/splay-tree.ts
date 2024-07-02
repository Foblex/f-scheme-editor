// Splay tree
// --------------------------------------------------
// Description: A self-balancing binary search tree with additional properties that allow faster access to recently accessed elements.
// --------------------------------------------------
// Complexity:
// •	Search: O(log n)
// •	Insertion: O(log n)
// •	Deletion: O(log n)
// •	Memory: O(n)
// --------------------------------------------------
// When to use: Useful when you need to search, insert and delete elements frequently and you need to keep the tree balanced to avoid performance degradation.
// Control version systems, network routing tables, etc.

// Example code:

import { IBinaryTreeNode } from './i-binary-tree-node';

export class SplayTreeNode<T> implements IBinaryTreeNode<T> {

  public left: SplayTreeNode<T> | null = null;

  public right: SplayTreeNode<T> | null = null;

  constructor(public key: number, public value: T) {
  }
}

export class SplayTree<T> {

  constructor(public root: SplayTreeNode<T> | null = null) {
  }

  private rightRotate(node: SplayTreeNode<T>): SplayTreeNode<T> {
    const left = node.left!;
    node.left = left.right;
    left.right = node;
    return left;
  }

  private leftRotate(node: SplayTreeNode<T>): SplayTreeNode<T> {
    const right = node.right!;
    node.right = right.left;
    right.left = node;
    return right;
  }

  private splay(key: number): void {
    if(this.root === null || this.root.key === key) {
      return;
    }

    this.root = this.splayRecursive(this.root, key);
  }

  private splayRecursive(node: SplayTreeNode<T>, key: number): SplayTreeNode<T> {
    if(node === null || node.key === key) {
      return node;
    }

    if(key < node.key) {
      if(node.left === null) {
        return node;
      }

      if(key < node.left.key) {
        node.left.left = this.splayRecursive(node.left.left!, key);
      } else if(key > node.left.key) {
        node.left.right = this.splayRecursive(node.left.right!, key);
      }

      if(node.left !== null) {
        node = this.rightRotate(node);
      }

      return node.left === null ? node : this.rightRotate(node);
    } else {
      if(node.right === null) {
        return node;
      }

      if(key < node.right.key) {
        node.right.left = this.splayRecursive(node.right.left!, key);
      } else if(key > node.right.key) {
        node.right.right = this.splayRecursive(node.right.right!, key);
      }

      if(node.right !== null) {
        node = this.leftRotate(node);
      }

      return node.right === null ? node : this.leftRotate(node);
    }
  }

  public insert(key: number, value: T): void {
    if(this.root === null) {
      this.root = new SplayTreeNode(key, value);
      return;
    }

    this.splay(key);

    if(key === this.root.key) {
      this.root.value = value;
      return;
    }

    const node = new SplayTreeNode(key, value);

    if(key < this.root.key) {
      node.right = this.root;
      node.left = this.root.left;
      this.root.left = null;
    } else {
      node.left = this.root;
      node.right = this.root.right;
      this.root.right = null;
    }

    this.root = node;
  }

  public search(key: number): T | null {
    this.splay(key);
    return this.root && this.root.key === key ? this.root.value : null;
  }

  public delete(key: number): void {
    this.splay(key);

    if(this.root && this.root.key === key) {
      if(this.root.left === null) {
        this.root = this.root.right;
      } else {
        const right = this.root.right;
        this.root = this.root.left;
        this.splay(key);
        this.root.right = right;
      }
    }
  }
}


