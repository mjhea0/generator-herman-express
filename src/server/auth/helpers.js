(() => {

  // *** dependencies *** //

  const bcrypt = require('bcryptjs');

  const queries = require('../db/queries');

  // *** helpers *** //

  function createSalt(rounds) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(rounds, (err, salt) => {
        if (err) reject('Something went wrong!');
        else resolve(salt);
      });
    });
  }

  function createHash(password, salt) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject('Something went wrong!');
        else resolve(hash);
      });
    });
  }

  function createUser(req) {
    return createSalt(10)
    .then((salt) => { return createHash(req.body.password, salt); })
    .then((hash) => { return queries.addUser(req.body.username, hash); })
    .then((user) => { return user; })
    .catch((err) => { throw Error(err); });
  }

  function comparePass(userPassword, databasePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(userPassword, databasePassword, (err, res) => {
        if (err) reject(err);
        if (res) resolve(true);
        if (!res) resolve(false);
      });
    });
  }

  function loginRedirect(req, res, next) {
    if (req.user) return res.redirect('/');
    return next();
  }

  function ensureAuthenticated(req, res, next) {
    if (req.user) {
      const userID = parseInt(req.user.id, 10);
      return queries.getSingleUserByID(userID)
      .then((user) => {
        if (user && parseInt(user.id, 10) === userID) { return next(); }
        return next('Sorry. That username and/or password is incorrect.');
      })
      .catch((err) => { return next(err); });
    }
    req.flash('messages', {
      status: 'danger',
      value: 'You need to log in before continuing.',
    });
    return res.redirect('/users/login');
  }

  // *** public *** //
  module.exports = {
    createUser,
    createSalt,
    createHash,
    comparePass,
    loginRedirect,
    ensureAuthenticated,
  };

})();
