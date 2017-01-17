(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');
  const router = express.Router();

  const helpers = require('./auth/helpers');
  const mainCtrl = require('./components/main/main.controller');
  const userCtrl = require('./components/users/users.controller');

  // *** main routes *** //
  router.get('/', mainCtrl.main);

  // *** users routes *** //
  router.get('/users', helpers.ensureAuthenticated, userCtrl.users);
  router.get('/users/login', helpers.loginRedirect, userCtrl.getLogin);
  router.post('/users/login', helpers.loginRedirect, userCtrl.postLogin);
  router.get('/users/register', helpers.loginRedirect, userCtrl.getRegister);
  router.post('/users/register', helpers.loginRedirect, userCtrl.postRegister);

  // *** public *** //
  module.exports = router;

}());
