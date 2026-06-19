import { describe, it, expect } from 'vitest';
import { safeSortStrings } from './solution';

describe('safeSortStrings()', () => {
  it('должна сортировать кириллические строки по алфавиту и уводить пустые/null значения в конец', () => {
    const input = ['Яблоко', null, 'Груша', undefined, '', 'Банан'];
    const result = safeSortStrings(input);

    expect(result).toEqual(['Банан', 'Груша', 'Яблоко', '', null, undefined]);
  });

  it('должна мутировать исходный массив (in-place)', () => {
    const input = ['Яблоко', 'Банан'];
    const result = safeSortStrings(input);
    expect(result).toBe(input);
  });

  it('должна корректно обрабатывать только валидные строки', () => {
    const input = ['Апельсин', 'Вишня', 'Брусника'];
    expect(safeSortStrings(input)).toEqual(['Апельсин', 'Брусника', 'Вишня']);
  });

  it('должна корректно обрабатывать только невалидные значения', () => {
    const input = [null, undefined, '', null];
    const result = safeSortStrings(input);
    // Порядок среди невалидных значений может быть любым, но они все должны остаться
    expect(result.length).toBe(4);
    expect(result.filter(x => x === null).length).toBe(2);
    expect(result.filter(x => x === undefined).length).toBe(1);
    expect(result.filter(x => x === '').length).toBe(1);
  });

  it('должна корректно работать с пустым массивом', () => {
    expect(safeSortStrings([])).toEqual([]);
  });
});
