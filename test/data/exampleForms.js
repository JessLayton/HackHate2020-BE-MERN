const validForm = {
  quarter: 1,
  year: 2020,
  nameDdpo: 'testDdpo',
  boroughsCovered: [
    'testBorough1',
    'testBorough2',
  ],
  referrals: {},
  reportingDetails: {
    reported: 12,
    supported: 5,
  },
  supportProvided: {},
  unreportedCases: {},
  intersectional: {},
  age: {},
  ethnicity: {},
  gender: {},
  sex: {},
  orientation: {},
  where: {},
  hateCrime: {},
  committedBy: {},
  currentIssues: {},
  impairments: {},
  keyIssuesParagraph: 'testPara',
  emotionalImpactCaseStudy: 'testImpactStudy',
  outcomesCaseStudy: 'testOutcomesStudy',
};

const validFormSamePeriod = {
  quarter: 1,
  year: 2020,
  nameDdpo: 'testDdpo2',
  boroughsCovered: [
    'testBorough1',
  ],
  referrals: {},
  reportingDetails: {
    reported: 8,
    supported: 2,
  },
  supportProvided: {},
  unreportedCases: {},
  intersectional: {},
  age: {},
  ethnicity: {},
  gender: {},
  sex: {},
  orientation: {},
  where: {},
  hateCrime: {},
  committedBy: {},
  currentIssues: {},
  impairments: {},
  keyIssuesParagraph: 'testPara',
  emotionalImpactCaseStudy: 'testImpactStudy',
  outcomesCaseStudy: 'testOutcomesStudy',
};

const validFormDifferentPeriod = {
  quarter: 3,
  year: 2021,
  nameDdpo: 'testDdpo3',
  boroughsCovered: [
    'testBorough2',
  ],
  referrals: {},
  reportingDetails: {
    reported: 21,
    supported: 8,
  },
  supportProvided: {},
  unreportedCases: {},
  intersectional: {},
  age: {},
  ethnicity: {},
  gender: {},
  sex: {},
  orientation: {},
  where: {},
  hateCrime: {},
  committedBy: {},
  currentIssues: {},
  impairments: {},
  keyIssuesParagraph: 'testPara',
  emotionalImpactCaseStudy: 'testImpactStudy',
  outcomesCaseStudy: 'testOutcomesStudy',
};

module.exports = { validForm, validFormSamePeriod, validFormDifferentPeriod };
