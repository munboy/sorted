import { describe, it, expect } from 'vitest';
import { immutableSort } from './solution';

describe('immutableSort()', () => {
  it('должна сортировать числа по убыванию', () => {
    const input = [3, 1, 4, 2];
    const result = immutableSort(input);
    expect(result).toEqual([4, 3, 2, 1]);
  });

  it('НЕ должна мутировать исходный массив (сохранять иммутабельность)', () => {
    const input = [10, 5, 8];
    const copy = [...input];
    
    const result = immutableSort(input);

    expect(result).not.toBe(input); // Должны быть разные объекты в памяти
    expect(input).toEqual(copy);   // Исходный массив не должен измениться
  });

  it('должна корректно работать с отрицательными числами', () => {
    const input = [-5, 0, 5, -10];
    expect(immutableSort(input)).toEqual([5, 0, -5, -10]);
  });

  it('должна корректно работать с пустым массивом', () => {
    const input: number[] = [];
    const result = immutableSort(input);
    expect(result).toEqual([]);
    expect(result).not.toBe(input); // Должна вернуть копию даже для пустого массива
  });
});
