const router = require('express').Router();

const { sortAndGroupByQuarter, formatForGraph } = require('../utilities/graphingUtils');
const Form = require('../models/formModel');

router.get('/reportingDetails', (_req, res) => {
  Form.find({}, ['quarter', 'year', 'reportingDetails'])
    .then((result) => {
      const flattenedResults = result.map(
        ({ quarter, year, reportingDetails: { reported, supported } }) => (
          {
            quarter,
            year,
            reported,
            supported,
            totalHandled: reported + supported,
          }
        ),
      );
      const sortedAndGrouped = sortAndGroupByQuarter(flattenedResults);
      const formattedForGraph = formatForGraph(sortedAndGrouped);
      res.status(200).json(formattedForGraph);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/reasons', (_req, res) => {
  Form.find({}, ['unreportedCases', 'quarter', 'year'])
    .then((result) => {
      const flattenedResults = result.map(({ quarter, year, unreportedCases }) => (
        {
          quarter,
          year,
          ...unreportedCases,
        }
      ));
      const sortedAndGrouped = sortAndGroupByQuarter(flattenedResults);
      const formattedForGraph = formatForGraph(sortedAndGrouped);
      res.status(200).json(formattedForGraph);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.error(err);
    });
});

module.exports = router;
