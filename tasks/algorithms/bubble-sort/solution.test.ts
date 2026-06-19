import { describe, it, expect } from 'vitest';
import { bubbleSort } from './solution';

describe('bubbleSort()', () => {
  it('должна сортировать массив по возрастанию', () => {
    const input = [5, 1, 4, 2, 8];
    expect(bubbleSort(input)).toEqual([1, 2, 4, 5, 8]);
  });

  it('должна изменять массив на месте (in-place)', () => {
    const input = [3, 1, 2];
    const result = bubbleSort(input);
    expect(result).toBe(input);
  });

  it('должна справляться со случаем, когда массив уже отсортирован', () => {
    const input = [1, 2, 3, 4, 5];
    expect(bubbleSort(input)).toEqual([1, 2, 3, 4, 5]);
  });

  it('должна сортировать массив, упорядоченный в обратном порядке', () => {
    const input = [5, 4, 3, 2, 1];
    expect(bubbleSort(input)).toEqual([1, 2, 3, 4, 5]);
  });

  it('должна справляться со значениями, содержащими дубликаты', () => {
    const input = [3, 1, 3, 2, 1];
    expect(bubbleSort(input)).toEqual([1, 1, 2, 3, 3]);
  });

  it('должна корректно работать с пустым массивом', () => {
    expect(bubbleSort([])).toEqual([]);
  });
});
