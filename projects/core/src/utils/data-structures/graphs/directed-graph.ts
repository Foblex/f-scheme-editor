// Directed Graph
// ----------------------------------------------------------------------
// Description: Graph where each edge has a direction. So if there is an edge from A to B, there is no edge from B to A.
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
// When to use: Useful when you need to represent relationships between objects with a direction, for example in road networks or dependencies.
// ----------------------------------------------------------------------
// Example code:
export class DirectedGraph<T> {

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

    public getVertices(): T[] {
      return Array.from(this.adjacencyList.keys());
    }

    public print(): void {
      for (const [vertex, neighbors] of this.adjacencyList) {
        console.log(`${vertex} -> ${Array.from(neighbors).join(', ')}`);
      }
    }
}
