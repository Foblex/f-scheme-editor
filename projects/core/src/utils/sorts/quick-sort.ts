//Quick Sort
//Description: A recursive algorithm that divides the array in half, sorts each half, and combines the sorted halves.
//Use cases: Used for sorting large arrays when stability is important.

// Сложности:
//
// •	Лучший случай: Θ(n log n) (случайный выбор опорного элемента)
// •	Средний случай: Θ(n log n)
// •	Худший случай: Θ(n^2) (если опорный элемент всегда минимальный или максимальный)
// •	Память: O(log n) (in-place, за счет рекурсивного стека)
//
// Когда использовать: Подходит для большинства случаев, особенно эффективен на больших массивах,
// если используется случайный выбор опорного элемента или улучшения вроде Quick Sort с выбором медианы трех.

export function quickSort(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[0];
  const left = [];
  const right = [];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}
