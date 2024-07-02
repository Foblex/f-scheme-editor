// Heap Sort
//
// Описание: Алгоритм, который использует структуру данных “куча” для сортировки элементов.
// Построение кучи и затем извлечение максимального элемента и перемещение его в конец массива.
//
//   Сложности:
//
// •	Лучший случай: O(n log n)
// •	Средний случай: O(n log n)
// •	Худший случай: O(n log n)
// •	Память: O(1) (in-place)
//
// Когда использовать: Подходит для ситуаций, когда требуется сортировка в месте с фиксированным объемом памяти.
//
// Пример кода:
export function heapSort(array: number[]): number[] {
  let length = array.length;

  // Построение кучи (перегруппируем массив)
  for (let i = Math.floor(length / 2); i >= 0; i--) {
    heapify(array, length, i);
  }

  // Извлечение элементов из кучи
  for (let i = length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]]; // Перемещение текущего корня в конец
    heapify(array, i, 0); // Вызов процедуры heapify на уменьшенной куче
  }

  return array;
}

function heapify(array: number[], length: number, i: number) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < length && array[left] > array[largest]) {
    largest = left;
  }

  if (right < length && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, length, largest);
  }
}
