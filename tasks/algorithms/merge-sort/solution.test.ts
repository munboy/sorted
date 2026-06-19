import { describe, it, expect } from 'vitest';
import { mergeSort } from './solution';

describe('mergeSort()', () => {
  it('должна сортировать массив по возрастанию', () => {
    const input = [38, 27, 43, 3, 9, 82, 10];
    expect(mergeSort(input)).toEqual([3, 9, 10, 27, 38, 43, 82]);
  });

  it('должна корректно работать с пустым массивом', () => {
    expect(mergeSort([])).toEqual([]);
  });

  it('должна оставлять отсортированный массив неизменным', () => {
    const input = [1, 2, 3];
    expect(mergeSort(input)).toEqual([1, 2, 3]);
  });

  it('должна сортировать отрицательные и дробные числа', () => {
    const input = [5.5, -2, 0, 1.1, -10];
    expect(mergeSort(input)).toEqual([-10, -2, 0, 1.1, 5.5]);
  });

  it('должна корректно сортировать массив с дубликатами', () => {
    const input = [4, 2, 4, 3, 2, 1];
    expect(mergeSort(input)).toEqual([1, 2, 2, 3, 4, 4]);
  });
});
