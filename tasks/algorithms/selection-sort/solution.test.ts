import { describe, it, expect } from 'vitest';
import { selectionSort } from './solution';

describe('selectionSort()', () => {
  it('должна сортировать массив по возрастанию', () => {
    const input = [64, 25, 12, 22, 11];
    expect(selectionSort(input)).toEqual([11, 12, 22, 25, 64]);
  });

  it('должна изменять массив на месте (in-place)', () => {
    const input = [3, 1, 2];
    const result = selectionSort(input);
    expect(result).toBe(input);
  });

  it('должна корректно работать с пустым массивом', () => {
    expect(selectionSort([])).toEqual([]);
  });

  it('должна оставлять отсортированный массив неизменным', () => {
    const input = [1, 2, 3];
    expect(selectionSort(input)).toEqual([1, 2, 3]);
  });

  it('должна сортировать отрицательные и дробные числа', () => {
    const input = [5.5, -2, 0, 1.1, -10];
    expect(selectionSort(input)).toEqual([-10, -2, 0, 1.1, 5.5]);
  });
});
