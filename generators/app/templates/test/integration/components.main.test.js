(() => {

  // *** set environment *** //
  process.env.NODE_ENV = 'test';

  // *** dependencies *** //
  const chai = require('chai');
  const should = chai.should();
  const chaiHttp = require('chai-http');
  chai.use(chaiHttp);

  const server = require('../../src/server/app');

  // *** tests *** //
  describe('components : main', () => {

    beforeEach((done) => { done(); });
    afterEach((done) => { done(); });

    describe('GET /', () => {
      it('should render the main page', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Welcome to Express!</h1>');
          res.text.should.contain('<h2>The sum is 3</h2>');
          res.text.should.contain(
            '<li><a href="/users/register">Register</a></li>');
          res.text.should.contain(
            '<li><a href="/users/login">Login</a></li>');
          res.text.should.not.contain(
            '<li><a href="/users">Users</a></li>');
          res.text.should.not.contain(
            '<li><a href="/users/logout">Logout</a></li>');
          done();
        });
      });
      it('should handle query strings', (done) => {
        chai.request(server)
        .get('/?num1=1&num2=23')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Welcome to Express!</h1>');
          res.text.should.contain('<h2>The sum is 24</h2>');
          done();
        });
      });
      it('should handle query strings', (done) => {
        chai.request(server)
        .get('/?num1=1&num2=test')
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(500);
          res.type.should.eql('application/json');
          res.body.status.should.eql(500);
          res.body.detail.should.eql('Something went wrong!');
          done();
        });
      });
    });

    describe('GET /404', () => {
      it('should error', (done) => {
        chai.request(server)
        .get('/404')
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.status.should.eql(404);
          res.body.detail.should.eql('Not Found.');
          done();
        });
      });
    });

  });

})();
