((routeConfig) => {

  routeConfig.init = (app) => {   // eslint-disable-line no-param-reassign

    // *** routes *** //
    const routes = require('../routes');

    // *** register routes *** //
    app.use('/', routes);

  };

})(module.exports);
