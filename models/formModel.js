const mongoose = require('mongoose');
const { collatorDb } = require('../dbs');

const formSchema = new mongoose.Schema({
    quarter: {
        type: Number, required: true, min: 1, max: 4,
    },
    year: {
        type: Number, min: 2000, max: 2100,
    },
    name_ddpo: {
        type: String, minLength: 2, maxLength: 40,
    },
    boroughs_covered: { type: Array },
    referrals: {
        type: Object,
    },
    reporting_details: {
        type: Object,
    },
    support_provided: {
        type: Object,
    },
    cases_not_police_report: {
        type: Object,
    },
    intersectional: {
        type: Object,
    },
    support_age: {
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
    hate_crime: {
        type: Object,
    },
    committed_by: {
        type: Object,
    },
    current_issues: {
        type: Object,
    },
    impairments: {
        type: Object,
    },
    ddpo_short_paragraph: {
        type: String, maxLength: 300,
    },
    casestudy_impact: {
        type: String, maxLength: 300,
    },
    casestudy_outcome: {
        type: String, maxLength: 300,
    },
});

const Form = collatorDb.model('form', formSchema);

module.exports = Form;