// (function() {
//
//   'use strict';
//
//   // *** set environment *** //
//   process.env.NODE_ENV = 'test';
//
//   // *** dependencies *** //
//   const chai = require('chai');
//   const should = chai.should();
//   const chaiHttp = require('chai-http');
//   chai.use(chaiHttp);
//
//   const knex = require('../../src/server/db/connection');
//   const server = require('../../src/server/app');
//
//   // *** tests *** //
//   describe('components : users', () => {
//
//     beforeEach(() => {
//       return knex.migrate.rollback()
//       .then(() => { return knex.migrate.latest(); })
//       .then(() => { return knex.seed.run(); });
//     });
//
//     afterEach(() => {
//       return knex.migrate.rollback();
//     });
//
//     describe('GET /users/login', () => {
//       it('should render the login page', (done) => {
//         chai.request(server)
//         .get('/users/login')
//         .end((err, res) => {
//           should.not.exist(err);
//           res.redirects.length.should.eql(0);
//           res.status.should.eql(200);
//           res.type.should.eql('text/html');
//           res.text.should.contain('<h1>Login</h1>');
//           done();
//         });
//       });
//     });
//
//     describe('POST /user/login', () => {
//       it('should redirect to the users page', (done) => {
//         chai.request(server)
//         .post('/users/login')
//         .send({ username: 'michael', password: 'herman'})
//         .end((err, res) => {
//           should.not.exist(err);
//           res.redirects.length.should.eql(2);
//           res.redirects[0].should.contain('/users');
//           res.status.should.eql(200);
//           res.type.should.eql('text/html');
//           done();
//         });
//       });
//       it('should redirect to the login page if username + password are incorrect', (done) => {
//         chai.request(server)
//         .post('/users/login')
//         .send({ username: 'incorrect', password: 'incorrect'})
//         .end((err, res) => {
//           should.not.exist(err);
//           res.redirects.length.should.eql(1);
//           res.redirects[0].should.contain('/users/login');
//           res.status.should.eql(200);
//           res.type.should.eql('text/html');
//           res.text.should.contain('<h1>Login</h1>');
//           done();
//         });
//       });
//     });
//
//   });
//
// }());
