const mongoose = require('mongoose');
const { collatorDb } = require('../dbs');

const formSchema = new mongoose.Schema({
  quarter: {
    type: Number, required: true, min: 1, max: 4,
  },
  year: {
    type: Number, required: true, min: 2000, max: 2100,
  },
  nameDdpo: {
    type: String, required: true, minLength: 2, maxLength: 40,
  },
  boroughsCovered: { type: Array, required: true },
  referrals: {
    type: Object, required: true,
  },
  reportingDetails: {
    type: Object,
    required: true,
  },
  ongoingDetails: {
    type: Object,
    required: true,
  },
  typeOfTimeDataAvailable: { type: Array, required: true },
  timeSpentNumerical: {
    type: Number,
    required: true,
  },
  timeSpentInfo: {
    type: String,
    required: true,
  },
  isWaitingList: {
    type: String,
    required: true,
  },
  waitingListCount: {
    type: Number,
    required: true,
  },
  supportProvided: {
    type: Object,
    required: true,
  },
  unreportedCases: {
    type: Object,
    required: true,
  },
  intersectional: {
    type: Object,
    required: true,
  },
  age: {
    type: Object,
    required: true,
  },
  ethnicity: {
    type: Object,
    required: true,
  },
  gender: {
    type: Object,
    required: true,
  },
  orientation: {
    type: Object,
    required: true,
  },
  where: {
    type: Object,
    required: true,
  },
  hateCrime: {
    type: Object,
    required: true,
  },
  committedBy: {
    type: Object,
    required: true,
  },
  currentIssues: {
    type: Object,
    required: true,
  },
  impairments: {
    type: Object,
    required: true,
  },
  keyIssuesParagraph: {
    type: String,
    validate: {
      validator: (emotionalImpactCaseStudy) => emotionalImpactCaseStudy.split(' ').length <= 300,
      message: () => 'Key issues paragraph must be 300 words or less',
    },
  },
  emotionalImpactCaseStudy: {
    type: String,
    validate: {
      validator: (emotionalImpactCaseStudy) => emotionalImpactCaseStudy.split(' ').length <= 300,
      message: () => 'Emotional impact case study must be 300 words or less',
    },
  },
  outcomesCaseStudy: {
    type: String,
    validate: {
      validator: (outcomesCaseStudy) => outcomesCaseStudy.split(' ').length <= 300,
      message: () => 'Outcomes case study must be 300 words or less',
    },
  },
});

const Form = collatorDb.model('form', formSchema);

module.exports = Form;
