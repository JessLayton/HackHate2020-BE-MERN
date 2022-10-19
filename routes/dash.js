const router = require('express').Router();

const {
  sortAndGroupByQuarter, formatForGraph, sumAllForGraph,
} = require('../utilities/graphingUtils');
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

router.get('/referralsOverTime', (_req, res) => {
  Form.find({}, ['quarter', 'year', 'referrals'])
    .then((result) => {
      const flattenedResults = result.map(
        ({ quarter, year, referrals: { referrals: total } }) => (
          {
            quarter,
            year,
            'Total referrals': total,
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

router.get('/allReferrals', (_req, res) => {
  Form.find({}, ['referrals'])
    .then((result) => {
      console.log(result);
      const flattenedResults = result.map(
        ({
          referrals: {
            self, fromAuthorities, other: otherOrgs, referrals: total,
          },
        }) => (
          {
            'Total number of referrals': total,
            'Number of people who came to you themselves (self-referred)': self,
            'Number of referrals via police / authorities': fromAuthorities,
            'Number of referrals from other organisations': otherOrgs,
            Other: total - (self + fromAuthorities + otherOrgs),
          }
        ),
      );
      const summed = sumAllForGraph(flattenedResults, 'Total referrals');
      res.status(200).json(summed);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get('/intersectionalHateCrime', (_req, res) => {
  Form.find({}, ['intersectional'])
    .then((result) => {
      const flattenedResults = result.map(
        ({
          intersectional: {
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
      const summed = sumAllForGraph(flattenedResults, 'Total cases');
      res.status(200).json(summed);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/supportProvided', (_req, res) => {
  Form.find({}, ['supportProvided', 'quarter', 'year'])
    .then((result) => {
      const flattenedResults = result.map(({
        quarter, year, supportProvided: {
          hateCrime,
          emotional,
          general,
          signposted,
          other,
        },
      }) => (
        {
          quarter,
          year,
          'Hate crime support': hateCrime,
          'Emotional support': emotional,
          'General support': general,
          'Signposted to support elsewhere': signposted,
          'Other support': other,
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
