(function(routeConfig) {

  routeConfig.init = (app) => {

    // *** routes *** //
    const routes = require('../routes/index');

    // *** register routes *** //
    app.use('/', routes);

  };

})(module.exports);
