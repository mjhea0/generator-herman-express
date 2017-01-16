(function() {

  'use strict';

  const knex = require('./connection');

  function addUser(username, hash) {
    const user = { username: username, password: hash };
    return knex('users')
    .insert(user)
    .returning('*');
  }

  function getSingleUserByID(id) {
    return knex('users')
    .where({
      id: parseInt(id)
    })
    .first();
  }

  module.exports = {
    addUser,
    getSingleUserByID
  };

}());
