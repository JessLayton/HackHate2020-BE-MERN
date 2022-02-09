/* eslint-disable camelcase */
const router = require('express').Router();
const Form = require('../models/formModel');

router.post('/create', async (req, res) => {
  const {
    quarter,
    year,
    nameDdpo,
    boroughsCovered,
    referrals,
    reportingDetails,
    ongoingDetails,
    supportProvided,
    unreportedCases,
    intersectional,
    age,
    ethnicity,
    gender,
    orientation,
    where,
    hateCrime,
    committedBy,
    currentIssues,
    impairments,
    keyIssuesParagraph,
    emotionalImpactCaseStudy,
    outcomesCaseStudy,
  } = req.body;

  try {
    const formData = new Form({
      quarter,
      year,
      nameDdpo,
      boroughsCovered,
      referrals,
      reportingDetails,
      ongoingDetails,
      supportProvided,
      unreportedCases,
      intersectional,
      age,
      ethnicity,
      gender,
      orientation,
      where,
      hateCrime,
      committedBy,
      currentIssues,
      impairments,
      keyIssuesParagraph,
      emotionalImpactCaseStudy,
      outcomesCaseStudy,
    });
    await formData.save();
    return res.status(200).json({
      form: {
        quarter,
        year,
        nameDdpo,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

module.exports = router;
