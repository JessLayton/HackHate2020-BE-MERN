const _ = require('lodash');

// const data = [
//   {
//     quarter: 1,
//     year: 2020,
//     value: {
//       test: 2,
//       another: [2, 3, 4],
//     },
//     another: [2, 3, 4],
//   },
//   {
//     quarter: 1,
//     year: 2019,
//     value: {
//       test: 2,
//       another: [2, 3, 4],
//     },
//     another: [2, 3, 4],
//   },
//   {
//     quarter: 1,
//     year: 2019,
//     value: {
//       test: 2,
//       another: [2, 3, 4],
//     },
//     another: [2, 3, 4],
//   },
//   {
//     quarter: 2,
//     year: 2019,
//     value: {
//       test: 2,
//       another: [2, 3, 4],
//     },
//     another: [2, 3, 4],
//   },
//   {
//     quarter: 3,
//     year: 2018,
//     value: {
//       test: 2,
//       another: [2, 3, 4],
//     },
//     another: [2, 3, 4],
//   },
// ];

const sumObjects = (obj1, obj2) => (
  _.mergeWith(obj1, obj2, (objValue, srcValue) => {
    if (_.isObject(objValue)) {
      return sumObjects(objValue, srcValue);
    }
    return objValue + srcValue;
  })
);

const sortAndGroupByQuarter = (data) => {
  let result = _.groupBy(data, ({ year, quarter }) => `${quarter} ${year}`);
  result = Object.entries(result).map(([period, values]) => [period.split(' '), values]);
  result = _.sortBy(result, ['0.1', '0.0']); // 0.1 is the year and 0.0 is the quarter, so sorts by year and then quarter
  result = result.map(([[quarter, year], values]) => {
    const summedTotals = values.reduce(
      (previous, {
        quarter: _quarter, year: _year, _id, ...rest
      }) => (
        sumObjects(rest, previous)
      ), {},
    );
    return { [`Q${quarter} ${year}`]: summedTotals };
  });
  return result;
};

module.exports = sortAndGroupByQuarter;
