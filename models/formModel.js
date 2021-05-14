const mongoose = require('mongoose');
const { collatorDb } = require('../dbs');

const formSchema = new mongoose.Schema({
    quarter: {
        type: Number, required: true, min: 1, max: 4,
    },
    year: {
        type: Number, min: 2000, max: 2100,
    },
    nameDdpo: {
        type: String, minLength: 2, maxLength: 40,
    },
    boroughsCovered: { type: Array },
    referrals: {
        type: Object,
    },
    reportingDetails: {
        type: Object,
    },
    supportProvided: {
        type: Object,
    },
    casesNotPoliceReport: {
        type: Object,
    },
    intersectional: {
        type: Object,
    },
    age: {
        type: Object,
    },
    ethnicity: {
        type: Object,
    },
    gender: {
        type: Object,
    },
    sex: {
        type: Object,
    },
    orientation: {
        type: Object,
    },
    where: {
        type: Object,
    },
    hateCrime: {
        type: Object,
    },
    committedBy: {
        type: Object,
    },
    currentIssues: {
        type: Object,
    },
    impairments: {
        type: Object,
    },
    keyIssuesParagraph: {
        type: String, maxLength: 300,
    },
    emotionalImpactCaseStudy: {
        type: String, maxLength: 300,
    },
    outcomesCaseStudy: {
        type: String, maxLength: 300,
    },
});

const Form = collatorDb.model('form', formSchema);

module.exports = Form;