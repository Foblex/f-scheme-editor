// Selection Sort
//
// Описание: Алгоритм сортировки, который делит массив на две части: отсортированную и неотсортированную, последовательно выбирая наименьший элемент из неотсортированной части и перемещая его в конец отсортированной.
//
//   Сложности:
//
//  •	Лучший случай: Sigma(n^2)
// 	•	Средний случай: Teta(n^2)
// 	•	Худший случай: O(n^2)
// 	•	Память: O(1) (in-place)
//
// Когда использовать: Подходит для небольших массивов и когда стоимость обмена элементов дорогая (например, для массивов на внешней памяти).
//
// Пример кода:
export function selectionSort(array: number[]): number[] {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
  return array;
}