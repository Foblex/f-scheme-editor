// Breadth First Search
// --------------------------------------------------
// Complexity:
// Graphs:
// •	Time complexity: O(V + E), where V is the number of vertices and E is the number of edges in the graph.
// •	Space complexity: O(V), where V is the number of vertices in the graph.
// Trees:
// •	Time complexity: O(V), where V is the number of vertices in the tree.
// •	Space complexity: O(V), where V is the number of vertices in the tree.
// --------------------------------------------------
// When to use: Useful when you need to visit all the vertices of a graph in a breadthward motion.

// --------------------------------------------------
// Example code:

import { IBinaryTreeNode } from '../trees/i-binary-tree-node';

export function breadthFirstSearch(node: IBinaryTreeNode<any> | null): void {
  if(!node) return;
  const queue: IBinaryTreeNode<any>[] = [node];
  while(queue.length) {
    const current = queue.shift()!;
    if(current.left) queue.push(current.left);
    if(current.right) queue.push(current.right);
  }
}

export function breadthFirstSearchGraph<T>(adjacencyList: Map<string, Set<string>>): void {

  const visited = new Set<string>();
  const queue: string[] = [];
  const startVertex = 'A';
  queue.push(startVertex);
  visited.add(startVertex);

  while(queue.length) {
    const currentVertex = queue.shift()!;
    const neighbors = adjacencyList.get(currentVertex);
    if(neighbors) {
      for(const neighbor of neighbors) {
        if(!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
}
