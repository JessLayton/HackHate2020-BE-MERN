/* eslint-disable camelcase */
const router = require('express').Router();
const Form = require('../models/formModel');

router.post('/form', async (req, res) => {
    const {
        quarter,
        year,
        name_ddpo,
        boroughs_covered,
        referrals,
        reporting_details,
        support_provided,
        cases_not_police_report,
        support_age,
        ethnicity,
        gender,
        sex,
        orientation,
        where,
        hate_crime,
        committed_by,
        current_issues,
        impairments,
        ddpo_short_paragraph,
        casestudy_impact,
        casestudy_outcome,
    } = req.body;

    try {
        const formData = new Form({
            quarter,
            year,
            name_ddpo,
            boroughs_covered,
            referrals,
            reporting_details,
            support_provided,
            cases_not_police_report,
            support_age,
            ethnicity,
            gender,
            sex,
            orientation,
            where,
            hate_crime,
            committed_by,
            current_issues,
            impairments,
            ddpo_short_paragraph,
            casestudy_impact,
            casestudy_outcome,
        });
        await formData.save();
        return res.status(200).json({
            form: {
                quarter,
                year,
                name_ddpo,
                hate_crime,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Unexpected error occurred' });
    }
});

module.exports = router;