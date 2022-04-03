const _ = require('lodash');

const sumObjects = (obj1, obj2) => (
  _.mergeWith(obj1, obj2, (objValue = 0, srcValue = 0) => {
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
    return {
      period: `Q${quarter} ${year}`,
      values: summedTotals,
    };
  });
  return result;
};

const formatForGraph = (sortedAndGroupedData, stacking = undefined) => {
  const xAxis = [];
  const dataObject = {};
  sortedAndGroupedData.forEach(({ group, values }, index) => {
    xAxis.push(group);
    Object.entries(values).forEach(([key, value]) => {
      if (!dataObject[key]) {
        dataObject[key] = Array(sortedAndGroupedData.length).fill(0);
      }
      dataObject[key].splice(index, 1, value);
    });
  });
  const dataArray = Object.entries(dataObject).map(([key, value]) => (
    {
      name: key,
      data: value,
      stacking,
    }
  ));
  return {
    xAxis,
    dataArray,
  };
};

const sumAllForGraph = (flattenedArray, name) => {
  const summed = flattenedArray.reduce(sumObjects);
  const xAxis = [];
  const data = Object.entries(summed).map(([key, value]) => {
    xAxis.push(key);
    return ({
      name: key,
      y: value,
    });
  });
  return {
    xAxis,
    dataArray: [{ data, name }],
  };
};

const stackQuarters = (dataArray) => {
  const summedData = dataArray.reduce(sumObj)
};

module.exports = {
  sortAndGroupByQuarter, sumObjects, formatForGraph, sumAllForGraph, stackQuarters,
};
