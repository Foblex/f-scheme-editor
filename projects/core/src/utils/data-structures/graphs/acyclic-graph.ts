// Acyclic graph
// ----------------------------------------------------------------------
// Description: Graph without cycles. That is it does not have a path that starts and ends at the same vertex.
// We have a directed acyclic graph (DAG) when the graph is directed and acyclic.
// We have an undirected acyclic graph when the graph is undirected and acyclic. Any tree is an example of an undirected acyclic graph.
// ----------------------------------------------------------------------
// Complexity:
// Adjaency list:
// •	Memory: O(V + E) where V is the number of vertices and E is the number of edges.
// •	Add vertex: O(1)
// •	Remove vertex: O(V + E) where V is the number of vertices and E is the number of edges.
// •	Add edge: O(1)
// •	Remove edge: O(E) where E is the number of edges.
// •	Check edge: O(V) where V is the number of vertices.
// •	Neighbors: O(K) where K is the number of neighbors.
// Adjaency matrix:
// •	Memory: O(V^2) where V is the number of vertices.
// •	Add vertex: O(V^2) where V is the number of vertices.
// •	Remove vertex: O(V^2) where V is the number of vertices.
// •	Add edge: O(1)
// •	Remove edge: O(1)
// •	Check edge: O(1)
// •	Neighbors: O(V) where V is the number of vertices.
// ----------------------------------------------------------------------
// When to use: Useful when you need to represent relationships between objects without cycles, for example in task scheduling or project management.
// ----------------------------------------------------------------------
// Example code:
export class AcyclicGraph<T> {

  private adjacencyList: Map<T, Set<T>> = new Map();

  public addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set());
    }
  }

  public removeVertex(vertex: T): void {
    this.adjacencyList.delete(vertex);
    for (const vertices of this.adjacencyList.values()) {
      vertices.delete(vertex);
    }
  }

  public addEdge(vertex1: T, vertex2: T): void {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList.get(vertex1)!.add(vertex2);
  }

  public removeEdge(vertex1: T, vertex2: T): void {
    this.adjacencyList.get(vertex1)!.delete(vertex2);
  }

  public hasEdge(vertex1: T, vertex2: T): boolean {
    return this.adjacencyList.get(vertex1)!.has(vertex2);
  }

  public getNeighbors(vertex: T): T[] {
    return Array.from(this.adjacencyList.get(vertex)!);
  }

  public print(): void {
    for (const [vertex, neighbors] of this.adjacencyList) {
      console.log(`${vertex}: ${Array.from(neighbors).join(', ')}`);
    }
  }

  public hasCycle(): boolean {
    const visited = new Set<T>();
    const stack = new Set<T>();
    for (const vertex of this.adjacencyList.keys()) {
      if (this.hasCycleHelper(vertex, visited, stack)) {
        return true;
      }
    }
    return false;
  }

  private hasCycleHelper(vertex: T, visited: Set<T>, stack: Set<T>): boolean {
    if (stack.has(vertex)) {
      return true;
    }
    if (visited.has(vertex)) {
      return false;
    }
    visited.add(vertex);
    stack.add(vertex);
    for (const neighbor of this.adjacencyList.get(vertex)!) {
      if (this.hasCycleHelper(neighbor, visited, stack)) {
        return true;
      }
    }
    stack.delete(vertex);
    return false;
  }
}
