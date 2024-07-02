// Insertion Sort
//
// Описание: Строит отсортированную последовательность, добавляя по одному элементу за раз,
// находя для каждого элемента его место в уже отсортированной части.
//
//   Сложности:
//
// •	Лучший случай: Sigma(n) (если массив уже отсортирован)
// •  Средний случай: Teta(n^2)
// •	Худший случай: O(n^2)
// •	Память: O(1) (in-place)
//
// Когда использовать: Эффективен для небольших массивов или массивов, которые частично отсортированы.
//
//  Пример кода:
export function insertionSort(array: number[]): number[] {
  const length = array.length;
  for (let i = 1; i < length; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
}
