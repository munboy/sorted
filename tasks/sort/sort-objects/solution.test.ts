import { describe, it, expect } from 'vitest';
import { sortUsers, User } from './solution';

describe('sortUsers()', () => {
  it('должна сортировать пользователей сначала по имени, затем по возрасту', () => {
    const input: User[] = [
      { name: 'Иван', age: 25 },
      { name: 'Анна', age: 22 },
      { name: 'Иван', age: 20 },
      { name: 'Анна', age: 18 }
    ];

    const result = sortUsers(input);

    expect(result).toEqual([
      { name: 'Анна', age: 18 },
      { name: 'Анна', age: 22 },
      { name: 'Иван', age: 20 },
      { name: 'Иван', age: 25 }
    ]);
  });

  it('должна мутировать исходный массив (in-place)', () => {
    const input: User[] = [
      { name: 'Петр', age: 30 },
      { name: 'Алексей', age: 20 }
    ];
    const result = sortUsers(input);
    expect(result).toBe(input);
  });

  it('должна корректно работать с пустым массивом', () => {
    expect(sortUsers([])).toEqual([]);
  });

  it('должна сохранять порядок для одиночного элемента', () => {
    const input = [{ name: 'Сергей', age: 40 }];
    expect(sortUsers(input)).toEqual([{ name: 'Сергей', age: 40 }]);
  });
});
