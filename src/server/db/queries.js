(() => {

  const knex = require('./connection');

  function addUser(username, hash) {
    const user = { username, password: hash };
    return knex('users')
    .insert(user)
    .returning('*');
  }

  function getSingleUserByUsername(username) {
    return knex('users')
    .where({ username })
    .first();
  }

  function getSingleUserByID(id) {
    return knex('users')
    .where({ id: parseInt(id, 10) })
    .first();
  }

  module.exports = {
    addUser,
    getSingleUserByUsername,
    getSingleUserByID,
  };

})();
