import { describe, it, expect, vi } from 'vitest';
import { sumPrices, Item } from './solution';

describe('sumPrices()', () => {
  it('должна корректно суммировать цены товаров', () => {
    const items: Item[] = [
      { name: 'Книга', price: 350 },
      { name: 'Ручка', price: 50 },
      { name: 'Тетрадь', price: 120 }
    ];
    expect(sumPrices(items)).toBe(520);
  });

  it('должна возвращать 0 для пустого списка товаров', () => {
    expect(sumPrices([])).toBe(0);
  });

  it('должна корректно работать с ценами, равными 0', () => {
    const items: Item[] = [
      { name: 'Бесплатный купон', price: 0 },
      { name: 'Подарок', price: 0 }
    ];
    expect(sumPrices(items)).toBe(0);
  });

  it('должна использовать метод reduce', () => {
    const spy = vi.spyOn(Array.prototype, 'reduce');
    const items: Item[] = [{ name: 'Тест', price: 100 }];
    
    // Call the function
    sumPrices(items);
    
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
