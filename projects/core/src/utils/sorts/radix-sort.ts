// Radix Sort
//
// Описание: Алгоритм сортировки, который сортирует элементы по разрядам, начиная с младшего разряда.

// Сложности:

// •	Лучший случай: Θ(nk) (где k — количество разрядов)
// •	Средний случай: Θ(nk)
// 	•	Худший случай: Θ(nk)
// 	•	Память: O(n + k) (не in-place)
//
// Когда использовать: Используется для сортировки больших массивов целых чисел или строк, когда значения имеют фиксированную длину.
// Эффективен для данных, где число разрядов (k) значительно меньше числа элементов (n).

export function radixSort(array: number[]): number[] {
  const max = Math.max(...array);
  const maxLength = max.toString().length;
  let result = array;
  for (let i = 0; i < maxLength; i++) {
    result = countingSortByDigit(result, i);
  }
  return result;
}

function countingSortByDigit(array: number[], digit: number): number[] {
  const buckets: number[][] = Array.from({ length: 10 }, () => []);
  for (let i = 0; i < array.length; i++) {
    const digitValue = getDigit(array[i], digit);
    buckets[digitValue].push(array[i]);
  }
  return buckets.flat();
}

function getDigit(num: number, digit: number): number {
  return Math.floor(Math.abs(num) / Math.pow(10, digit)) % 10;
}
