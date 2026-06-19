import { describe, it, expect } from 'vitest';
import { findMax } from './solution';

describe('findMax()', () => {
  it('должна возвращать максимум в стандартном числовом массиве', () => {
    expect(findMax([1, 5, 3, 9, 2])).toBe(9);
  });

  it('должна корректно обрабатывать только отрицательные числа', () => {
    expect(findMax([-10, -5, -30, -2])).toBe(-2);
  });

  it('должна корректно обрабатывать дробные числа', () => {
    expect(findMax([1.5, 2.75, 2.1, 0.95])).toBe(2.75);
  });

  it('должна возвращать undefined для пустого массива', () => {
    expect(findMax([])).toBeUndefined();
  });

  it('должна возвращать единственный элемент для массива длины 1', () => {
    expect(findMax([42])).toBe(42);
  });
});
