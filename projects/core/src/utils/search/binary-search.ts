// Binary Search
//
// Description: Algorithm to search for a value in a sorted array by repeatedly dividing the search interval in half.
//
//   Complexity:
// •	Best case: Sigma(1) (element is in the middle of the array)
// •	Average case: Tetha(log n)
// •	Worst case: O(log n)
// •	Memory: O(1) (in-place) or O(log n) (recursive version with call stack)
//
// When to use: Useful when the array is sorted and the array is large.
//
// Example code:
export function binarySearch(array: number[], value: number): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);

    if (array[middle] === value) {
      return middle;
    } else if (array[middle] < value) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}
