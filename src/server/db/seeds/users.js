(() => {

  const bcrypt = require('bcryptjs');

  exports.seed = (knex, Promise) => {
    return knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('herman', salt);
      return Promise.join(
        knex('users').insert({
          username: 'michael',
          password: hash,
        })     // eslint-disable-line comma-dangle
      );
    });
  };

})();
