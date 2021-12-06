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
            'Cases reported to police': reported,
            'Cases supported but not reported to police': supported,
            'Total cases handled': reported + supported,
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
      const flattenedResults = result.map(({
        quarter, year, unreportedCases: {
          lackEvidence,
          notTrustPolice,
          policeNotBelieve,
          afraid,
          abuseStop,
          talk,
          clientOther,
          other,
        },
      }) => (
        {
          quarter,
          year,
          'Not enough evidence': lackEvidence,
          'Don\'t trust the Police': notTrustPolice,
          'Police didn\'t believe me before': policeNotBelieve,
          'Afraid to go to the Authorities': afraid,
          'Just want the abuse to stop': abuseStop,
          'Need someone to talk to in confidence': talk,
          'Other reasons': clientOther,
          'Other/Unknown': other,
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
