// Merge Sort
//
// Описание: Рекурсивный алгоритм, который делит массив пополам, сортирует каждую половину
// и объединяет отсортированные половины.
//
//   Сложности:
//
// •	Лучший случай: Sigma(n log n)
// •	Средний случай: Teta(n log n)
// •	Худший случай: O(n log n)
// •	Память: O(n) (не in-place)
//
// Когда использовать: Используется для сортировки больших массивов, когда важна стабильность
// сортировки и предсказуемое время выполнения.
//
// Пример кода:
export function mergeSort(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);

  return merge(
    mergeSort(leftSlice(array, middle)),
    mergeSort(rightSlice(array, middle))
  );
}

function leftSlice(array: number[], middle: number): number[] {
  return array.slice(0, middle);
}

function rightSlice(array: number[], middle: number): number[] {
  return array.slice(middle);
}

function merge(left: number[], right: number[]): number[] {
  let result: number[] = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift()!);
    } else {
      result.push(right.shift()!);
    }
  }

  return result.concat(left, right);
}

