const DDPOModel = require('../models/DDPOModel');
const Form = require('../models/formModel');
const { validForm, validFormSamePeriod, validFormDifferentPeriod } = require('./data/exampleForms');

exports.mochaHooks = {
  async beforeAll() {
    const testDDPO = new DDPOModel({
      name: 'testDDPO',
    });
    await testDDPO.save();

    const testForm1 = new Form(validForm);
    const testForm2 = new Form(validFormSamePeriod);
    const testForm3 = new Form(validFormDifferentPeriod);

    await testForm1.save();
    await testForm2.save();
    await testForm3.save();
  },
  async afterAll() {
    await DDPOModel.deleteMany();
    await Form.deleteMany();
  },
};
