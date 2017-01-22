(() => {

  // *** dependencies *** //
  const express = require('express');
  const router = express.Router();
  const csrf = require('csurf')({ cookie: true });

  const helpers = require('./auth/helpers');
  const mainCtrl = require('./components/main/main.controller');
  const userCtrl = require('./components/users/users.controller');
  const validateUsers = require('./components/users/users.validation');

  const loginRedirect = helpers.loginRedirect;
  const ensureAuthenticated = helpers.ensureAuthenticated;

  // *** main routes *** //
  router.get('/', mainCtrl.main);

  // *** users routes *** //
  /* eslint-disable comma-dangle */
  router.get('/users', ensureAuthenticated, userCtrl.users);
  router.get('/users/login', loginRedirect, csrf, userCtrl.getLogin);
  router.post(
    '/users/login', loginRedirect, csrf,
    validateUsers, userCtrl.postLogin
  );
  router.get('/users/register', loginRedirect, csrf, userCtrl.getRegister);
  router.post(
    '/users/register', loginRedirect, csrf,
    validateUsers, userCtrl.postRegister
  );
  router.get('/users/logout', ensureAuthenticated, userCtrl.logout);
  /* eslint-enable comma-dangle */

  // *** public *** //
  module.exports = router;

})();
