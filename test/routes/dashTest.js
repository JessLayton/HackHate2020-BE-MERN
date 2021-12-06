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
                name: 'Cases reported to police',
                data: [20, 21],
              },
              {
                name: 'Cases supported but not reported to police',
                data: [7, 8],
              },
              {
                name: 'Total cases handled',
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
              { name: 'Not enough evidence', data: [12, 12] },
              { name: 'Don\'t trust the Police', data: [14, 0] },
              { name: 'Police didn\'t believe me before', data: [9, 7] },
              { name: 'Afraid to go to the Authorities', data: [15, 2] },
              { name: 'Just want the abuse to stop', data: [4, 7] },
              { name: 'Need someone to talk to in confidence', data: [25, 21] },
              { name: 'Other reasons', data: [2, 0] },
              { name: 'Other/Unknown', data: [12, 14] },
            ],
          });
          done();
        }
      });
  });
});
