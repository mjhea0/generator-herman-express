(() => {

  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;

  const knex = require('../../db/connection');
  const authHelpers = require('../helpers');

  require('../init')();

  const options = {};

  passport.use(new LocalStrategy(options, (username, password, done) => {
    // (1) does the user exist?
    // (2) is the password valid?
    const self = {};
    knex('users').where({ username }).first()
    .then((user) => {
      if (!user) return done(null, false);
      self.user = user;
      return authHelpers.comparePass(password, self.user.password);
    })
    .then((res) => {
      if (res) { return done(null, self.user); }
      return done(null, false);
    })
    .catch((err) => { return done(err); });
  }));

  module.exports = passport;

})();
