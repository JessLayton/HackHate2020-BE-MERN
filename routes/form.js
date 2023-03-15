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
    typeOfTimeDataAvailable,
    timeSpentNumerical,
    timeSpentInfo,
    isWaitingList,
    waitingListCount,
    supportProvided,
    unreportedCases,
    intersectional,
    typeOfDemographicDataAvailable,
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
    submissionDetails,
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
      typeOfTimeDataAvailable,
      timeSpentNumerical,
      timeSpentInfo,
      isWaitingList,
      waitingListCount,
      supportProvided,
      unreportedCases,
      intersectional,
      typeOfDemographicDataAvailable,
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
      submissionDetails,
    });
    await formData.save();
    return res.status(200).json({
      form: {
        quarter,
        year,
        nameDdpo,
        submissionDetails,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

// update to filter by user
router.get('/submissions', (_req, res) => {
  Form.find({}, ['nameDdpo', 'submissionDetails'])
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/formData', (req, res) => {
  const { id } = req.params;
  Form.findById(id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
