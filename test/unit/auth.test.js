(() => {

  // *** set environment *** //
  process.env.NODE_ENV = 'test';

  // *** dependencies *** //
  const chai = require('chai');
  const should = chai.should();

  const helpers = require('../../src/server/auth/helpers');

  // *** tests *** //
  describe('auth : helpers', () => {

    describe('createSalt()', () => {
      it('should return a salt', () => {
        return helpers.createSalt(10)
        .then((salt) => { salt.should.be.a('string'); })
        .catch((err) => { should.not.exist(err); });
      });
      it('should return an error', () => {
        return helpers.createSalt('test')
        .then((salt) => { should.not.exist(salt); })
        .catch((err) => {
          should.exist(err);
          err.should.eql('Something went wrong!');
        });
      });
    });

    describe('createHash()', () => {
      it('should return a hashed password', () => {
        return helpers.createSalt(10)
        .then((salt) => {
          salt.should.be.a('string');
          return helpers.createHash('test', salt)
          .then((hash) => { hash.should.be.a('string'); })
          .catch((err) => { should.not.exist(err); });
        });
      });
      it('should return an error', () => {
        return helpers.createHash(null, null)
        .then((hash) => { should.not.exist(hash); })
        .catch((err) => {
          should.exist(err);
          err.should.eql('Something went wrong!');
        });
      });
    });

    describe('comparePass()', () => {
      it('should return true if password is correct', () => {
        return helpers.createSalt(10)
        .then((salt) => {
          salt.should.be.a('string');
          return helpers.createHash('test123', salt)
          .then((hash) => {
            return helpers.comparePass('test123', hash)
            .then((res) => { res.should.eql(true); })
            .catch((err) => { should.not.exist(err); });
          })
          .catch((err) => { should.not.exist(err); });
        });
      });
      it('should return false if password is incorrect', () => {
        return helpers.createSalt(10)
        .then((salt) => {
          salt.should.be.a('string');
          return helpers.createHash('test123', salt)
          .then((hash) => {
            return helpers.comparePass('test456', hash)
            .then((res) => { res.should.eql(false); })
            .catch((err) => { should.not.exist(err); });
          })
          .catch((err) => { should.not.exist(err); });
        });
      });
      it('should return an error', () => {
        return helpers.comparePass(null, null)
        .then((res) => { should.not.exist(res); })
        .catch((err) => {
          should.exist(err);
          err.message.should.contain('Illegal arguments');
        });
      });
    });

  });

})();
