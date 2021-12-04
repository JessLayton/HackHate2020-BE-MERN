const router = require('express').Router();
const axios = require('axios');

const { sortAndGroupByQuarter } = require('../utilities/graphingUtils');
const Form = require('../models/formModel');

const { PYTHON_URL } = process.env;

router.get('/reportingDetails', (_req, res) => {
  Form.find({}, ['quarter', 'year', 'reportingDetails'])
    .then((result) => {
      console.log(result);
      axios.post(`${PYTHON_URL}/reportingNumbers`, result)
        .then((response) => {
          // extract data from response object
          res.status(200).json(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
          console.error(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/reasons', (_req, res) => {
  Form.find({}, ['unreportedCases', 'quarter', 'year'])
    .then((result) => {
      const sortedAndGrouped = sortAndGroupByQuarter(result.map(({ _doc }) => _doc));
      res.status(200).json(sortedAndGrouped);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.error(err);
    });
});

module.exports = router;
