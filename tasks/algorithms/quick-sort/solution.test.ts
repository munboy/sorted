import { describe, it, expect } from 'vitest';
import { quickSort } from './solution';

describe('quickSort()', () => {
  it('должна сортировать массив по возрастанию', () => {
    const input = [10, 7, 8, 9, 1, 5];
    expect(quickSort(input)).toEqual([1, 5, 7, 8, 9, 10]);
  });

  it('должна изменять массив на месте (in-place)', () => {
    const input = [3, 1, 2];
    const result = quickSort(input);
    expect(result).toBe(input);
  });

  it('должна корректно работать с пустым массивом', () => {
    expect(quickSort([])).toEqual([]);
  });

  it('должна оставлять отсортированный массив неизменным', () => {
    const input = [1, 2, 3];
    expect(quickSort(input)).toEqual([1, 2, 3]);
  });

  it('должна сортировать отрицательные и дробные числа', () => {
    const input = [5.5, -2, 0, 1.1, -10];
    expect(quickSort(input)).toEqual([-10, -2, 0, 1.1, 5.5]);
  });

  it('должна корректно сортировать массив с дубликатами', () => {
    const input = [4, 2, 4, 3, 2, 1];
    expect(quickSort(input)).toEqual([1, 2, 2, 3, 4, 4]);
  });
});
