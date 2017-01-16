(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');
  const router = express.Router();

  const helpers = require('./auth/helpers');
  const mainController = require('./components/main/main.controller');
  const userController = require('./components/users/users.controller');

  // *** main routes *** //
  router.get('/', mainController.main);

  // *** users routes *** //
  router.get('/users', helpers.ensureAuthenticated, userController.users);
  router.get('/users/login', helpers.loginRedirect, userController.getLogin);
  router.post('/users/login', helpers.loginRedirect, userController.postLogin);

  // *** public *** //
  module.exports = router;

}());
