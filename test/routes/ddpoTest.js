const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../../app');

chai.should();
chai.use(chaiHttp);

describe('/ddpo routes', () => {
  it('should POST a DDPO', (done) => {
    chai.request(server)
      .post('/api/ddpo/addDDPO')
      .send(
        {
          name: 'TestingDDPO',
        },
      )
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.data.name.should.equal('TestingDDPO');
          done();
        }
      });
  });

  it('should return a 400 error and not POST a DDPO if the DDPO is invalid', (done) => {
    chai.request(server)
      .post('/api/ddpo/addDDPO')
      .send(
        {
          name: '',
        },
      )
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          console.log(res);
          res.should.have.status(400);
          res.text.should.equal('{"msg":"DDPOs must have a name between 2 and 40 characters"}');
          done();
        }
      });
  });

  it('should GET all the DDPOs', (done) => {
    chai.request(server)
      .get('/api/ddpo/getDDPOs')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data.should.not.have.a.lengthOf(0);
          done();
        }
      });
  });
});
