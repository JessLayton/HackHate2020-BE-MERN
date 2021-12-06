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
          res.should.have.status(200);
          res.body.should.deep.equal(
            {
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
            },
          );
          done();
        }
      });
  });
});
