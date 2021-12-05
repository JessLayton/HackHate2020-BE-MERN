const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../app');

const { validForm } = require('./data/exampleForms');

chai.should();
chai.use(chaiHttp);

describe('/form routes', () => {
  it('should POST a form', (done) => {
    chai
      .request(server)
      .post('/api/form/create')
      .send(validForm)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          done();
        }
      });
  });
});
