const { describe, it } = require('mocha');

const assert = require('assert');

const { sumObjects, sortAndGroupByQuarter } = require('../../utilities/graphingUtils');
const { ungroupedYearAndQuarterData, unsortedYearAndQuarterData, sortedYearAndQuarterData } = require('../data/dashData');

describe('sumObjects function', () => {
  it('should sum the values two objects with the same keys', () => {
    const summedObjects = sumObjects({ test1: 6, test2: 8 }, { test1: 3, test2: 12 });
    assert.deepStrictEqual(summedObjects, { test1: 9, test2: 20 });
  });

  it('should sum the values two objects with different keys', () => {
    const summedObjects = sumObjects({ test1: 6 }, { test1: 3, test2: 12 });
    assert.deepStrictEqual(summedObjects, { test1: 9, test2: 12 });
  });

  it('should sum the values two objects with different keys (reversed)', () => {
    const summedObjects = sumObjects({ test1: 3, test2: 12 }, { test1: 6 });
    assert.deepStrictEqual(summedObjects, { test1: 9, test2: 12 });
  });

  it('should sum the values two nested objects', () => {
    const summedObjects = sumObjects(
      { test1: { test3: 1, test4: 5 }, test2: 8 }, { test1: { test3: 2, test4: 1 }, test2: 12 },
    );
    assert.deepStrictEqual(summedObjects, { test1: { test3: 3, test4: 6 }, test2: 20 });
  });
});

describe('sortAndGroupByQuarter function', () => {
  it('should group the data by year and quarter', () => {
    const grouped = sortAndGroupByQuarter(ungroupedYearAndQuarterData);
    assert.deepStrictEqual(grouped,
      [{
        group: 'Q2 2021',
        values: {
          reported: 68,
          supported: 44,
          totalHandled: 112,
        },
      }]);
  });

  it('should sort the data by year and quarter', () => {
    const sorted = sortAndGroupByQuarter(unsortedYearAndQuarterData);
    assert.deepStrictEqual(sorted, sortedYearAndQuarterData);
  });
});
