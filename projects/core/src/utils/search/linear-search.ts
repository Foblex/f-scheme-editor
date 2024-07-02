// Linear Search
//
// Description: Alogrithm to search for a value in an array by checking each element in the array until the value is found.
//
//   Complexity:
//  •	Best case: Sigma(1) (first element is the value)
//  •	Average case: Tetha(n)
//  •	Worst case: O(n)
//  •	Memory: O(1) (in-place)
//
// When to use: Useful when the array is unsorted or when the array is small. Not recommended for large arrays.
//
// Example code:
export function linearSearch(array: number[], value: number): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}
