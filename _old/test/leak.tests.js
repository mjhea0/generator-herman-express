(() => {

  // *** set environment *** //
  process.env.NODE_ENV = 'test';

  // *** dependencies *** //
  const iterate = require('leakage').iterate;

  const mainHelpers = require('../src/server/components/main/main.helpers');

  // *** tests *** //
  describe('components : main', () => {

    describe('sumSync()', () => {
      it('should not cause a memory leak', () => {
        iterate(100, () => {
          mainHelpers.sumSync(1, 2);
        });
      });
    });

  });

})();
