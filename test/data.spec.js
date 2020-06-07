import {
  arrayHeroes, resultSearchCase, resultFilter, resultOrder,
} from '../test_cases/cases.js';
import { searchHero, filterChampions, sortAlphabet } from '../src/data.js';

describe('cloneData', () => {
  it('Is a function', () => {
    expect(typeof searchHero).toBe('function');
  });

  it('returns `array with info*s Ahri`', () => {
    expect(searchHero(arrayHeroes, 'ah')).toStrictEqual(resultSearchCase);
  });
});

describe('filterChampions', () => {
  it('Is a function', () => {
    expect(typeof filterChampions).toBe('function');
  });

  it('returns ', () => {
    expect(filterChampions(arrayHeroes, 'Mage')).toStrictEqual(resultFilter);
  });
});

describe('sortAlphabeth', () => {
  it('Is a function', () => {
    expect(typeof sortAlphabet).toBe('function');
  });

  it('returns array sorted A-Z', () => {
    expect(sortAlphabet(arrayHeroes, 'asc')).toStrictEqual(resultOrder);
  });

  it('returns array sorted Z-A', () => {
    expect(sortAlphabet(arrayHeroes, 'des')).toStrictEqual(resultOrder.reverse());
  });
});
