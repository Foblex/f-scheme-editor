
// Bucket sort
//
// Описание: Алгоритм сортировки, который разбивает массив на несколько "ведер" (buckets), каждое из которых
// сортируется отдельно, обычно с использованием другого алгоритма сортировки, в зависимости от размера ведра.

// Сложности:
//
//   •	Лучший случай: Θ(n + k)
// 	•	Средний случай: Θ(n + k)
// 	•	Худший случай: O(n^2)
// 	•	Память: O(n + k) (не in-place)
//
// Когда использовать: Эффективен для равномерно распределенных данных, когда число ведер (k) меньше или равно числу элементов (n).

import { insertionSort } from './insertion-sort';

export function bucketSort(array: number[], bucketSize = 5): number[] {
  if (array.length === 0) {
    return array;
  }

  const min = Math.min(...array);
  const max = Math.max(...array);

  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets: number[][] = new Array(bucketCount).fill(null).map(() => []);

  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - min) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }

  array.length = 0;
  for (let i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]);
    for (let j = 0; j < buckets[i].length; j++) {
      array.push(buckets[i][j]);
    }
  }

  return array;
}
