(() => {

  // *** set environment *** //
  process.env.NODE_ENV = 'test';

  // *** dependencies *** //
  const chai = require('chai');
  const should = chai.should();

  const helpers = require('../../src/server/components/main/main.helpers');

  // *** tests *** //
  describe('components : main', () => {

    describe('sumSync()', () => {
      it('should return a total', (done) => {
        helpers.sumSync(1, 2).should.eql(3);
        done();
      });
      it('should return an error', (done) => {
        try {
          helpers.sumSync(1, {});
        } catch (e) {
          should.exist(e);
          e.message.should.eql('Something went wrong!');
        }
        done();
      });
    });

    describe('sumWithCallback()', () => {
      it('should return a total', (done) => {
        helpers.sumWithCallback(1, 2, (err, total) => {
          should.not.exist(err);
          total.should.eql(3);
          done();
        });
      });
      it('should return an error', (done) => {
        helpers.sumWithCallback(1, 'test', (err, total) => {
          should.not.exist(total);
          err.should.eql('Something went wrong!');
          done();
        });
      });
    });

    describe('sumWithPromise()', () => {
      it('should return a total', () => {
        return helpers.sumWithPromise(1, 2)
        .then((results) => { results.should.eql(3); })
        .catch((err) => { should.not.exist(err); });
      });
      it('should return an error', () => {
        return helpers.sumWithPromise(1, 'test')
        .then((results) => { should.not.exist(results); })
        .catch((err) => {
          should.exist(err);
          err.should.eql('Something went wrong!');
        });
      });
    });

  });

})();
