(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');
  const router = express.Router();
  const csrf = require('csurf')({ cookie: true });

  const helpers = require('./auth/helpers');
  const mainCtrl = require('./components/main/main.controller');
  const userCtrl = require('./components/users/users.controller');

  const loginRedirect = helpers.loginRedirect;
  const ensureAuthenticated = helpers.ensureAuthenticated;

  // *** main routes *** //
  router.get('/', mainCtrl.main);

  // *** users routes *** //
  router.get('/users', ensureAuthenticated, userCtrl.users);
  router.get('/users/login', loginRedirect, csrf, userCtrl.getLogin);
  router.post('/users/login', loginRedirect, csrf, userCtrl.postLogin);
  router.get('/users/register', loginRedirect, csrf, userCtrl.getRegister);
  router.post('/users/register', loginRedirect, csrf, userCtrl.postRegister);
  router.get('/users/logout', ensureAuthenticated, userCtrl.logout);

  // *** public *** //
  module.exports = router;

}());
