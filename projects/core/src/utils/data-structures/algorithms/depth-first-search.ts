// Depth First Search (DFS) algorithm implementation
// --------------------------------------------------
// Complexity:
// Graphs:
// •	Time complexity: O(V + E), where V is the number of vertices and E is the number of edges in the graph.
// •	Space complexity: O(V), where V is the number of vertices in the graph.
// Trees:
// •	Time complexity: O(V), where V is the number of vertices in the tree.
// •	Space complexity: O(V), where V is the number of vertices in the tree.
// --------------------------------------------------
// When to use: Useful when you need to visit all the vertices of a graph in a depthward motion.
// --------------------------------------------------
// Example code:
import { IBinaryTreeNode } from '../trees/i-binary-tree-node';

export function depthFirstSearch(node: IBinaryTreeNode<any> | null): void {
  if(!node) return;
  depthFirstSearch(node.left);
  depthFirstSearch(node.right);
}

export function depthFirstSearchGraph<T>(adjacencyList: Map<string, Set<string>>): void {
  const visited = new Set<string>();
  const dfsRecursive = (vertex: string) => {
    if (!vertex || visited.has(vertex)) return;

    console.log(vertex); // Действие при посещении вершины
    visited.add(vertex);

    adjacencyList.get(vertex)!.forEach((neighbor: string) => {
      dfsRecursive(neighbor);
    });
  };
}
