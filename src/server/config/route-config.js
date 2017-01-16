(function(routeConfig) {

  'use strict';

  routeConfig.init = (app) => {

    // *** routes *** //
    const routes = require('../routes');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/users', routes);

  };

})(module.exports);
