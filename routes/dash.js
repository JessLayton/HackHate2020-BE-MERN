const router = require('express').Router();

const { sortAndGroupByQuarter, formatForGraph, sumAllForGraph } = require('../utilities/graphingUtils');
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
      const formattedForGraph = formatForGraph(sortedAndGrouped, 'normal');
      res.status(200).json(formattedForGraph);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.error(err);
    });
});

router.get('/referralsOverTime', (_req, res) => {
  Form.find({}, ['quarter', 'year', 'reportingDetails'])
    .then((result) => {
      const flattenedResults = result.map(
        ({ quarter, year, reportingDetails: { total } }) => (
          {
            quarter,
            year,
            'Total referrals': total,
          }
        ),
      );
      const sortedAndGrouped = sortAndGroupByQuarter(flattenedResults);
      console.log(sortedAndGrouped);
      const formattedForGraph = formatForGraph(sortedAndGrouped);
      console.log(formattedForGraph);
      res.status(200).json(formattedForGraph);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/allReferrals', (_req, res) => {
  Form.find({}, ['reportingDetails'])
    .then((result) => {
      const flattenedResults = result.map(
        ({
          reportingDetails: {
            self, fromAuthorities, other: otherOrgs, total,
          },
        }) => (
          {
            'Number of people who came to you themselves (self-referred)': self,
            'Number of referrals via police / authorities': fromAuthorities,
            'Number of referrals from other organisations': otherOrgs,
            Other: total - (self + fromAuthorities + otherOrgs),
          }
        ),
      );
      const summed = sumAllForGraph(flattenedResults);
      console.log(summed);
      res.status(200).json(summed);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/allReferralsStacked', (_req, res) => {
  Form.find({}, ['reportingDetails'])
    .then((result) => {
      const flattenedResults = result.map(
        ({
          quarter,
          year,
          reportingDetails: {
            self, fromAuthorities, other: otherOrgs, total,
          },
        }) => (
          {
            'Number of people who came to you themselves (self-referred)': self,
            'Number of referrals via police / authorities': fromAuthorities,
            'Number of referrals from other organisations': otherOrgs,
            Other: total - (self + fromAuthorities + otherOrgs),
            quarter: `Q${quarter} ${year}`,
          }
        ),
      );
      const summed = sumAllForGraph(flattenedResults);
      console.log(summed);
      res.status(200).json(summed);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/intersectionalHateCrime', (_req, res) => {
  Form.find({}, ['reportingDetails'])
    .then((result) => {
      const flattenedResults = result.map(
        ({
          intersectionalCrimes: {
            ableist, racial, religious, orientation, transgenderNonbinary, misogynistic, ageist,
          },
        }) => (
          {
            'Disability Hate Crime': ableist,
            'Racial Hate Crime': racial,
            'Religious Hate Crime': religious,
            'Sexual Orientation Hate Crime': orientation,
            'Transgender / Nonbinary Hate Crime': transgenderNonbinary,
            'Misogynistic Hate Crime': misogynistic,
            'Ageist Hate Crime': ageist,
          }
        ),
      );
      const summed = sumAllForGraph(flattenedResults, 'Referrals');
      console.log(summed);
      res.status(200).json(summed);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
