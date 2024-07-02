// Counting Sort

// Описание: Алгоритм сортировки для целых чисел, который подсчитывает количество каждого
// значения и использует эту информацию для их упорядочивания.
//

//   Сложности:
// •	Лучший случай: Omega(n + k)
// •	Средний случай: Theta(n + k)
// •	Худший случай: O(n + k)
// •	Память: O(n + k) (не in-place, где k - количество уникальных элементов)
//
// Когда использовать: Эффективен для сортировки числовых массивов,
// где диапазон значений не слишком велик по сравнению с размером массива.

export function countingSort(array: number[]): number[] {
  const max = Math.max(...array);
  const min = Math.min(...array);
  const count = Array(max - min + 1).fill(0);
  const result = Array(array.length);

  for (let i = 0; i < array.length; i++) {
    count[array[i] - min]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  for (let i = array.length - 1; i >= 0; i--) {
    result[count[array[i] - min] - 1] = array[i];
    count[array[i] - min]--;
  }

  return result;
}
