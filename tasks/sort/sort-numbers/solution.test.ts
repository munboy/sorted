import { describe, it, expect } from 'vitest';
import { sortNumbers } from './solution';

describe('sortNumbers()', () => {
  it('должна математически верно сортировать числа по возрастанию', () => {
    const input = [10, 5, 2, 20, 1];
    const result = sortNumbers(input);
    expect(result).toEqual([1, 2, 5, 10, 20]);
  });

  it('должна мутировать исходный массив (сортировка in-place)', () => {
    const input = [3, 1, 2];
    const result = sortNumbers(input);
    expect(result).toBe(input); // Проверка ссылочного равенства
  });

  it('должна корректно сортировать отрицательные и положительные числа', () => {
    const input = [-3, 10, 0, -10, 5];
    expect(sortNumbers(input)).toEqual([-10, -3, 0, 5, 10]);
  });

  it('должна справляться со значениями с плавающей точкой', () => {
    const input = [5.5, 2.2, 5.1, 1.1];
    expect(sortNumbers(input)).toEqual([1.1, 2.2, 5.1, 5.5]);
  });

  it('должна оставлять пустой массив нетронутым', () => {
    expect(sortNumbers([])).toEqual([]);
  });
});
