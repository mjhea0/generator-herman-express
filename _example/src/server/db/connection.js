(() => {

  // *** dependencies *** //
  const environment = process.env.NODE_ENV;
  const config = require('../../../knexfile.js')[environment];

  // *** public *** //
  module.exports = require('knex')(config);

})();
