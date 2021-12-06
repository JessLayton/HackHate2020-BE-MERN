const DDPOModel = require('../models/DDPOModel');
const Form = require('../models/formModel');
const { validForm } = require('./data/exampleForms');

exports.mochaHooks = {
  async beforeAll() {
    const testDDPO = new DDPOModel({
      name: 'testDDPO',
    });
    await testDDPO.save();

    const testForm = new Form(validForm);
    await testForm.save();
  },
  async afterAll() {
    await DDPOModel.deleteMany();
    await Form.deleteMany();
  },
};
