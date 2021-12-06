const ungroupedYearAndQuarterData = [
  {
    year: 2021,
    quarter: 2,
    reported: 12,
    supported: 32,
    totalHandled: 44,
  },
  {
    year: 2021,
    quarter: 2,
    reported: 56,
    supported: 12,
    totalHandled: 68,
  },
];

const unsortedYearAndQuarterData = [
  {
    year: 2020,
    quarter: 3,
    reported: 8,
    supported: 2,
    totalHandled: 10,
  },
  {
    year: 2019,
    quarter: 2,
    reported: 56,
    supported: 12,
    totalHandled: 68,
  },
  {
    year: 2019,
    quarter: 1,
    reported: 56,
    supported: 12,
    totalHandled: 68,
  },
  {
    year: 2021,
    quarter: 2,
    reported: 10,
    supported: 12,
    totalHandled: 22,
  },
  {
    year: 2020,
    quarter: 3,
    reported: 5,
    supported: 2,
    totalHandled: 7,
  },
];

const sortedYearAndQuarterData = [
  {
    period: 'Q1 2019',
    values: {
      reported: 56,
      supported: 12,
      totalHandled: 68,
    },
  },
  {
    period: 'Q2 2019',
    values: {
      reported: 56,
      supported: 12,
      totalHandled: 68,
    },
  },
  {
    period: 'Q3 2020',
    values: {
      reported: 13,
      supported: 4,
      totalHandled: 17,
    },
  },
  {
    period: 'Q2 2021',
    values: {
      reported: 10,
      supported: 12,
      totalHandled: 22,
    },
  },
];

module.exports = {
  ungroupedYearAndQuarterData,
  unsortedYearAndQuarterData,
  sortedYearAndQuarterData,
};
