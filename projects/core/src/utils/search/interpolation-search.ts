// Interpolation Search
//
// Description: Algorithm which improves on binary search by using the value of
// the key being searched for to estimate the position of the key in the array.
//
//   Complexity:
// •	Best case: Sigma(1) (element found at the first step)
// •	Average case: Tetha(log log n)
// •	Worst case: O(n) (when elements are uniformly distributed - если данные распределены равномерно)
// •	Memory: O(1) (in-place)
//
// When to use: Useful when the array is sorted and uniformly distributed.
//
// Example code:
export function interpolationSearch(array: number[], value: number): number {
  let low = 0;
  let high = array.length - 1;

  while (low <= high && value >= array[low] && value <= array[high]) {
    let position = low + Math.floor(((value - array[low]) * (high - low)) / (array[high] - array[low]));

    if (array[position] === value) {
      return position;
    } else if (array[position] < value) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }

  return -1;
}
