const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../../app');

chai.should();
chai.use(chaiHttp);

describe('/dash routes', () => {
  it('should GET and return sorted and grouped reporting details data', (done) => {
    chai
      .request(server)
      .get('/api/dash/reportingDetails')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.should.deep.equal({
            xAxis: ['Q1 2020', 'Q3 2021'],
            dataArray: [
              {
                name: 'reported',
                data: [20, 21],
              },
              {
                name: 'supported',
                data: [7, 8],
              },
              {
                name: 'totalHandled',
                data: [27, 29],
              },
            ],
          });
          done();
        }
      });
  });

  it('should GET and return sorted and grouped reasons for unreported cases data', (done) => {
    chai
      .request(server)
      .get('/api/dash/reasons')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.should.deep.equal({
            xAxis: ['Q1 2020', 'Q3 2021'],
            dataArray: [
              { name: 'lackEvidence', data: [12, 12] },
              { name: 'notTrustPolice', data: [14, 0] },
              { name: 'policeNotBelieve', data: [9, 7] },
              { name: 'afraid', data: [15, 2] },
              { name: 'abuseStop', data: [4, 7] },
              { name: 'talk', data: [25, 21] },
              { name: 'clientOther', data: [2, 0] },
              { name: 'other', data: [12, 14] },
            ],
          });
          done();
        }
      });
  });
});
