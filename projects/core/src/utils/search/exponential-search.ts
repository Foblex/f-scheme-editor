// Exponential search
//
// Description: Algorithm to search for a value in a sorted array by finding the range where the value is located and then using binary search.
//
//   Complexity:
// •	Best case: Sigma(1) (element found at the first iteration)
// •	Average case: Tetha(log n)
// •	Worst case: O(log n)
// •	Memory: O(1) (in-place)
//
// When to use: Useful when the array is sorted and the array is large and value located in the beginning of the array.

// Example code:
import { binarySearch } from './binary-search';

export function exponentialSearch(array: number[], value: number): number {
  if (array[0] === value) {
    return 0;
  }

  let i = 1;
  while (i < array.length && array[i] <= value) {
    i *= 2;
  }

  return binarySearch(array.slice(i / 2, Math.min(i, array.length)), value);
}

