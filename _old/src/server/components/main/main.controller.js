(() => {

  // *** dependencies *** //
  const helpers = require('./main.helpers.js');

  // *** handlers *** //

  function main(req, res, next) {
    const renderObject = {};
    renderObject.title = 'Welcome to Express!';
    renderObject.messages = req.flash('messages');
    renderObject.user = req.user;
    try {
      const num1 = req.query.num1 || 1;
      const num2 = req.query.num2 || 2;
      const total = helpers.sumSync(num1, num2);
      renderObject.sum = total;
      return res.render('main', renderObject);
    } catch (e) {
      return next(e);
    }
  }

  // *** public *** //
  module.exports = {
    main,
  };

})();
