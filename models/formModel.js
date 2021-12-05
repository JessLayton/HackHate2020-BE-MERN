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
  sex: {
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
    type: String, maxLength: 300, required: true,
  },
  emotionalImpactCaseStudy: {
    type: String, maxLength: 300, required: true,
  },
  outcomesCaseStudy: {
    type: String, maxLength: 300, required: true,
  },
});

const Form = collatorDb.model('form', formSchema);

module.exports = Form;
