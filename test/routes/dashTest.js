const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../../app');

chai.should();
chai.use(chaiHttp);

describe('/dash routes', () => {
  it('should GET the reporting details data', (done) => {
    chai.request(server)
      .get('/api/dash/reportingDetails')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          console.log('**************', res.body);
          res.should.have.status(200);
          res.body.should.deep.equal([{ 'Q1 2020': { reported: 12, supported: 5, totalHandled: 17 } }]);
          done();
        }
      });
  });
});
