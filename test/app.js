(function() {

  'use strict';

  const path = require('path');
  const assert = require('yeoman-assert');
  const helpers = require('yeoman-test');

  describe('generator-galvanize-html:app', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise();
    });

    it('creates files', () => {
      assert.file([
        'dummyfile.txt'
      ]);
    });
  });

}());
