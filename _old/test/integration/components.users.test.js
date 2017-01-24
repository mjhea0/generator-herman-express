(() => {

  // *** set environment *** //
  process.env.NODE_ENV = 'test';

  // *** dependencies *** //
  const chai = require('chai');
  const should = chai.should();
  const chaiHttp = require('chai-http');
  chai.use(chaiHttp);

  const knex = require('../../src/server/db/connection');
  const server = require('../../src/server/app');
  const queries = require('../../src/server/db/queries');
  const helpers = require('../helpers.js');

  const passportStub = require('passport-stub');
  passportStub.install(server);

  // *** tests *** //
  describe('components : users', () => {

    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
      return knex.migrate.rollback()
      .then(() => { passportStub.logout(); });
    });

    describe('GET /users/login', () => {
      it('should render the login page', (done) => {
        chai.request(server)
        .get('/users/login')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Login</h1>');
          done();
        });
      });
      it('should redirect to `/` if user is already logged in', () => {
        return queries.getSingleUserByUsername('michael')
        .then((user) => {
          passportStub.login(user);
          chai.request(server)
          .get('/users/login')
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(1);
            res.redirects[0].should.contain('/');
            res.status.should.eql(200);
            res.type.should.eql('text/html');
            res.text.should.contain('<h1>Welcome to Express!</h1>');
          });
        });
      });
    });

    describe('POST /users/login', () => {
      it('should redirect to the users page if username + password are correct and the CSRF token is correct', (done) => {
        chai.request(server)
        .get('/users/login')
        .end((err, res) => {
          const csrfToken = helpers.extractCsrfToken(res);
          chai.request(server)
          .post('/users/login')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: csrfToken, username: 'michael', password: 'herman' })
          .end((error, response) => {
            should.not.exist(error);
            response.redirects.length.should.eql(2);
            response.redirects[0].should.contain('/users');
            response.status.should.eql(200);
            response.type.should.eql('text/html');
            done();
          });
        });
      });
      it('should redirect to the login page if username + password are incorrect and the CSRF token is correct', (done) => {
        chai.request(server)
        .get('/users/login')
        .end((err, res) => {
          const csrfToken = helpers.extractCsrfToken(res);
          chai.request(server)
          .post('/users/login')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: csrfToken, username: 'null', password: 'incorrect' })
          .end((error, response) => {
            should.not.exist(error);
            response.redirects.length.should.eql(1);
            response.redirects[0].should.contain('/users/login');
            response.status.should.eql(200);
            response.type.should.eql('text/html');
            response.text.should.contain('<h1>Login</h1>');
            done();
          });
        });
      });
      it('should redirect to `/` if user is already logged in', () => {
        return queries.getSingleUserByUsername('michael')
        .then((user) => {
          passportStub.login(user);
          chai.request(server)
          .post('/users/login')
          .send({ username: 'incorrect', password: 'incorrect' })
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(1);
            res.redirects[0].should.contain('/');
            res.status.should.eql(200);
            res.type.should.eql('text/html');
            res.text.should.contain('<h1>Welcome to Express!</h1>');
          });
        });
      });
      it('should error if the CSRF token is incorrect', (done) => {
        chai.request(server)
        .get('/users/login')
        .end((err, res) => {
          chai.request(server)
          .post('/users/login')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: 'invalid', username: 'michael', password: 'herman' })
          .end((error, response) => {
            should.exist(error);
            response.redirects.length.should.eql(0);
            response.status.should.eql(403);
            response.body.error.should.eql('session has expired or tampered with');
            done();
          });
        });
      });
      it('should error if a username is not provided and the CSRF token is correct', (done) => {
        chai.request(server)
        .get('/users/login')
        .end((err, res) => {
          const csrfToken = helpers.extractCsrfToken(res);
          chai.request(server)
          .post('/users/login')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: csrfToken, username: null, password: 'herman' })
          .end((error, response) => {
            should.exist(error);
            response.status.should.eql(400);
            response.type.should.eql('application/json');
            response.body.message.should.eql('Validation failed');
            response.body.failures[0].msg.should.eql(
              'Username cannot be empty');
            done();
          });
        });
      });
      it('should error if a password is not provided and the CSRF token is correct', (done) => {
        chai.request(server)
        .get('/users/login')
        .end((err, res) => {
          const csrfToken = helpers.extractCsrfToken(res);
          chai.request(server)
          .post('/users/login')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: csrfToken, username: 'michael', password: null })
          .end((error, response) => {
            should.exist(error);
            response.status.should.eql(400);
            response.type.should.eql('application/json');
            response.body.message.should.eql('Validation failed');
            response.body.failures[0].msg.should.eql(
              'Password cannot be empty');
            done();
          });
        });
      });
    });

    describe('GET /users/register', () => {
      it('should render the register page', (done) => {
        chai.request(server)
        .get('/users/register')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Register</h1>');
          done();
        });
      });
      it('should redirect to `/` if user is already logged in', () => {
        return queries.getSingleUserByUsername('michael')
        .then((user) => {
          passportStub.login(user);
          chai.request(server)
          .get('/users/register')
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(1);
            res.redirects[0].should.contain('/');
            res.status.should.eql(200);
            res.type.should.eql('text/html');
            res.text.should.contain('<h1>Welcome to Express!</h1>');
          });
        });
      });
    });

    describe('POST /users/register', () => {
      it('should redirect to the users page if the CSRF token is correct', (done) => {
        chai.request(server)
        .get('/users/login')
        .end((err, res) => {
          const csrfToken = helpers.extractCsrfToken(res);
          chai.request(server)
          .post('/users/register')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: csrfToken, username: 'john', password: 'lamb' })
          .end((error, response) => {
            should.not.exist(error);
            response.redirects.length.should.eql(2);
            response.redirects[0].should.contain('/users');
            response.status.should.eql(200);
            response.type.should.eql('text/html');
            done();
          });
        });
      });
      it('should redirect to `/` if user is already logged in', () => {
        return queries.getSingleUserByUsername('michael')
        .then((user) => {
          passportStub.login(user);
          chai.request(server)
          .post('/users/register')
          .send({ username: 'john', password: 'lamb' })
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(1);
            res.redirects[0].should.contain('/');
            res.status.should.eql(200);
            res.type.should.eql('text/html');
            res.text.should.contain('<h1>Welcome to Express!</h1>');
          });
        });
      });
      it('should error if the username is not unique and the CSRF token is correct', (done) => {
        chai.request(server)
        .get('/users/login')
        .end((err, res) => {
          const csrfToken = helpers.extractCsrfToken(res);
          chai.request(server)
          .post('/users/register')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: csrfToken, username: 'michael', password: 'herman' })
          .end((error, response) => {
            should.exist(error);
            response.redirects.length.should.eql(0);
            response.status.should.eql(500);
            response.type.should.eql('application/json');
            response.body.status.should.eql(500);
            response.body.detail.should.eql('error: insert into "users" ("password", "username") values ($1, $2) returning * - duplicate key value violates unique constraint "users_username_unique"');
            done();
          });
        });
      });
      it('should error if the CSRF token is incorrect', (done) => {
        chai.request(server)
        .get('/users/register')
        .end((err, res) => {
          chai.request(server)
          .post('/users/register')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: 'invalid', username: 'michael', password: 'herman' })
          .end((error, response) => {
            should.exist(error);
            response.redirects.length.should.eql(0);
            response.status.should.eql(403);
            response.body.error.should.eql('session has expired or tampered with');
            done();
          });
        });
      });
      it('should error if a username is not provided and the CSRF token is correct', (done) => {
        chai.request(server)
        .get('/users/register')
        .end((err, res) => {
          const csrfToken = helpers.extractCsrfToken(res);
          chai.request(server)
          .post('/users/register')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: csrfToken, username: null, password: 'herman' })
          .end((error, response) => {
            should.exist(error);
            response.status.should.eql(400);
            response.type.should.eql('application/json');
            response.body.message.should.eql('Validation failed');
            response.body.failures[0].msg.should.eql(
              'Username cannot be empty');
            done();
          });
        });
      });
      it('should error if a password is not provided and the CSRF token is correct', (done) => {
        chai.request(server)
        .get('/users/register')
        .end((err, res) => {
          const csrfToken = helpers.extractCsrfToken(res);
          chai.request(server)
          .post('/users/register')
          .set('cookie', res.headers['set-cookie'])
          .send({ _csrf: csrfToken, username: 'michael', password: null })
          .end((error, response) => {
            should.exist(error);
            response.status.should.eql(400);
            response.type.should.eql('application/json');
            response.body.message.should.eql('Validation failed');
            response.body.failures[0].msg.should.eql(
              'Password cannot be empty');
            done();
          });
        });
      });
    });

    describe('GET /users', () => {
      it('should render the users page if authenticated', () => {
        return queries.getSingleUserByUsername('michael')
        .then((user) => {
          passportStub.login(user);
          chai.request(server)
          .get('/users')
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('text/html');
            res.text.should.contain('<h1>Users</h1>');
            res.text.should.contain(
              `<p>Welcome, <strong>${user.username}</strong>!</p>`);
            res.text.should.not.contain(
              '<li><a href="/users/register">Register</a></li>');
            res.text.should.not.contain(
              '<li><a href="/users/login">Login</a></li>');
            res.text.should.contain(
              '<li><a href="/users">Users</a></li>');
            res.text.should.contain(
              '<li><a href="/users/logout">Logout</a></li>');
          });
        });
      });
      it('should redirect to the login page if not authenticated', (done) => {
        chai.request(server)
        .get('/users')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(1);
          res.redirects[0].should.contain('/users/login');
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Login</h1>');
          done();
        });
      });
    });

    describe('GET /logout', () => {
      it('should redirect to `/` if user is authenticated', () => {
        return queries.getSingleUserByUsername('michael')
        .then((user) => {
          passportStub.login(user);
          chai.request(server)
          .get('/users/logout')
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(1);
            res.redirects[0].should.contain('/');
            res.status.should.eql(200);
            res.type.should.eql('text/html');
            res.text.should.contain('<h1>Welcome to Express!</h1>');
          });
        });
      });
      it('should redirect to the login page if not authenticated', (done) => {
        chai.request(server)
        .get('/users/logout')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(1);
          res.redirects[0].should.contain('/users/login');
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Login</h1>');
          done();
        });
      });
    });

  });

})();
