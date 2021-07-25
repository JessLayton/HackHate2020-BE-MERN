const router = require('express').Router();
const axios = require('axios');

const { PYTHON_URL } = process.env;

const Form = require('../models/formModel');

router.get('/reportingDetails', (_req, res) => {
  Form.find({}, ['quarter', 'year', 'reportingDetails'])
    .then((result) => {
      axios.post(`${PYTHON_URL}/reportingNumbers`, result)
        .then((response) => {
          // extract data from response object
          res.status(200).json(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/reasons', (_req, res) => {
  Form.find({}, ['unreportedCases', 'quarter', 'year'])
    .then((result) => {
      axios.post(`${PYTHON_URL}/unreportedCases`, result)
        .then((response) => {
          // extract data from response object
          res.status(200).json(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
