const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('/form routes', () => {
  it('should POST a form', (done) => {
    chai
      .request(server)
      .post('/api/form')
      .send({
        quarter: 4,
      })
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
