(function() {

  'use strict';

  // *** dependencies *** //
  const helpers = require('./users.helpers.js');
  const passport = require('../../auth/strategies/local');
  const authHelpers = require('../../auth/helpers');

  // *** handlers *** //

  function users(req, res, next) {
    const renderObject = {};
    renderObject.title = 'Users';
    renderObject.messages = req.flash('messages');
    renderObject.user = req.user;
    res.render('users', renderObject);
  }

  function getLogin(req, res, next) {
    const renderObject = {};
    renderObject.title = 'Login';
    renderObject.messages = req.flash('messages');
    res.render('login', renderObject);
  }

  function postLogin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('messages', {
          status: 'danger',
          value: 'Sorry. That username and/or password is incorrect.'
        });
        return res.redirect('/users/login');
      }
      if (user) {
        req.logIn(user, (err) => {
          if (err) { return next(err); }
          req.flash('messages', {
            status: 'success',
            value: 'Thanks for logging in.'
          });
          return res.redirect('/users');
        });
      }
    })(req, res, next);
  }

  function getRegister(req, res, next) {
    const renderObject = {};
    renderObject.title = 'Register';
    renderObject.messages = req.flash('messages');
    res.render('Register', renderObject);
  }

  function postRegister(req, res, next) {
    return authHelpers.createUser(req)
    .then((user) => {
      req.logIn(user[0], (err) => {
        if (err) { return next(err); }
        req.flash('messages', {
          status: 'success',
          value: 'Thanks for registering.'
        });
        return res.redirect('/users');
      });
    })
    .catch((err) => { return next(err); });
  }

  // *** public *** //
  module.exports = {
    users,
    getLogin,
    postLogin,
    getRegister,
    postRegister
  };

}());
