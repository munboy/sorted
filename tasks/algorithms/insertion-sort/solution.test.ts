import { describe, it, expect } from 'vitest';
import { insertionSort } from './solution';

describe('insertionSort()', () => {
  it('должна сортировать массив по возрастанию', () => {
    const input = [12, 11, 13, 5, 6];
    expect(insertionSort(input)).toEqual([5, 6, 11, 12, 13]);
  });

  it('должна изменять массив на месте (in-place)', () => {
    const input = [3, 1, 2];
    const result = insertionSort(input);
    expect(result).toBe(input);
  });

  it('должна корректно работать с пустым массивом', () => {
    expect(insertionSort([])).toEqual([]);
  });

  it('должна оставлять отсортированный массив неизменным', () => {
    const input = [1, 2, 3];
    expect(insertionSort(input)).toEqual([1, 2, 3]);
  });

  it('должна сортировать отрицательные и дробные числа', () => {
    const input = [5.5, -2, 0, 1.1, -10];
    expect(insertionSort(input)).toEqual([-10, -2, 0, 1.1, 5.5]);
  });
});
