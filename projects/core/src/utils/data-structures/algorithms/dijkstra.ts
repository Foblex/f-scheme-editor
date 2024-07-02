// Dijkstra
// --------------------------------------------------------------------------
// Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph.
// --------------------------------------------------------------------------
// Pseudocode:
// 1. Create a table of distances from the start vertex to all other vertices.
// 2. Create a priority queue that contains all vertices in the graph.
// 3. Set the distance to the start vertex as 0 and infinity to all other vertices.
// 4. While the priority queue is not empty:
//    - Extract the vertex with the smallest distance from the priority queue.
//    - For each neighbor of the extracted vertex:
//      - Calculate the distance to the neighbor through the extracted vertex.
//      - If the calculated distance is less than the current distance to the neighbor, update the distance.
// 5. Return the table of distances.
// --------------------------------------------------------------------------
// Complexity:
// •	Time complexity: O(V^2) where V is the number of vertices in the graph.
// •	Space complexity: O(V) where V is the number of vertices in the graph.
// --------------------------------------------------------------------------
// When to use: Useful when you need to find the shortest path between two vertices in a graph.
// --------------------------------------------------------------------------
// Example code:

class PriorityQueue<T> {
  private values: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number): void {
    this.values.push({ element, priority });
    this.sort();
  }

  dequeue(): { element: T; priority: number } | undefined {
    return this.values.shift();
  }

  private sort(): void {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  isEmpty(): boolean {
    return !this.values.length;
  }
}

export function dijkstra(
  adjacencyList: Map<string, Map<string, number>>,
  startVertex: string
): Map<string, number> {
  const distances = new Map<string, number>();
  const priorityQueue = new PriorityQueue<string>();

  for (const vertex of adjacencyList.keys()) {
    distances.set(vertex, vertex === startVertex ? 0 : Infinity);
    priorityQueue.enqueue(vertex, distances.get(vertex)!);
  }

  while (!priorityQueue.isEmpty()) {
    const { element: currentVertex } = priorityQueue.dequeue()!;

    for (const [neighbor, weight] of adjacencyList.get(currentVertex)!.entries()) {
      const distance = distances.get(currentVertex)! + weight;
      if (distance < distances.get(neighbor)!) {
        distances.set(neighbor, distance);
        priorityQueue.enqueue(neighbor, distance);
      }
    }
  }

  return distances;
}
