import { describe, it, expect } from 'vitest';
import { heapSort } from './solution';

describe('heapSort()', () => {
  it('должна сортировать массив по возрастанию', () => {
    const input = [12, 11, 13, 5, 6, 7];
    expect(heapSort(input)).toEqual([5, 6, 7, 11, 12, 13]);
  });

  it('должна изменять массив на месте (in-place)', () => {
    const input = [3, 1, 2];
    const result = heapSort(input);
    expect(result).toBe(input);
  });

  it('должна корректно работать с пустым массивом', () => {
    expect(heapSort([])).toEqual([]);
  });

  it('должна оставлять отсортированный массив неизменным', () => {
    const input = [1, 2, 3];
    expect(heapSort(input)).toEqual([1, 2, 3]);
  });

  it('должна сортировать отрицательные и дробные числа', () => {
    const input = [5.5, -2, 0, 1.1, -10];
    expect(heapSort(input)).toEqual([-10, -2, 0, 1.1, 5.5]);
  });

  it('должна корректно сортировать массив с дубликатами', () => {
    const input = [4, 2, 4, 3, 2, 1];
    expect(heapSort(input)).toEqual([1, 2, 2, 3, 4, 4]);
  });
});
