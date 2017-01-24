(() => {

  // *** dependencies *** //
  const passport = require('../../auth/strategies/local');
  const authHelpers = require('../../auth/helpers');

  // *** handlers *** //

  function users(req, res) {
    const renderObject = {};
    renderObject.title = 'Users';
    renderObject.messages = req.flash('messages');
    renderObject.user = req.user;
    res.render('users', renderObject);
  }

  function getLogin(req, res) {
    const renderObject = {};
    renderObject.title = 'Login';
    renderObject.messages = req.flash('messages');
    renderObject.user = req.user;
    renderObject.csrf = req.csrfToken();
    res.render('login', renderObject);
  }

  function postLogin(req, res, next) {
    /* eslint-disable consistent-return */
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('messages', {
          status: 'danger',
          value: 'Sorry. That username and/or password is incorrect.',
        });
        return res.redirect('/users/login');
      }
      if (user) {
        req.logIn(user, (error) => {
          if (error) { return next(error); }
          req.flash('messages', {
            status: 'success',
            value: 'Thanks for logging in.',
          });
          return res.redirect('/users');
        });
      }
    })(req, res, next);
    /* eslint-enable consistent-return */
  }

  function getRegister(req, res) {
    const renderObject = {};
    renderObject.title = 'Register';
    renderObject.messages = req.flash('messages');
    renderObject.user = req.user;
    renderObject.csrf = req.csrfToken();
    res.render('Register', renderObject);
  }

  function postRegister(req, res, next) {
    return authHelpers.createUser(req)
    .then((user) => {
      req.logIn(user[0], (err) => {
        if (err) { return next(err); }
        req.flash('messages', {
          status: 'success',
          value: 'Thanks for registering.',
        });
        return res.redirect('/users');
      });
    })
    .catch((err) => { return next(err); });
  }

  function logout(req, res) {
    req.logout();
    req.flash('messages', {
      status: 'success',
      value: 'You successfully logged out.',
    });
    res.redirect('/');
  }

  // *** public *** //
  module.exports = {
    users,
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout,
  };

})();
