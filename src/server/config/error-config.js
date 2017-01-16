(function(errorConfig) {

  'use strict';

  // *** error handling *** //

  errorConfig.init = (app) => {

    // print out stack for javascript exception
    process.on('uncaughtException', (err) => {
      console.log('');
      console.error(err.stack);
      process.exit();
    });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      const err = new Error('Not Found.');
      err.status = 404;
      next(err);
    });

    // development error handler (will print stacktrace)
    if (app.get('env') === 'development') {
      app.use((err, req, res, next) => {
        if (!err) return next();
        console.log(err);
        const status = err.status || 500;
        const message = {
          status: status,
          stack: err.stack,
          code: err.code,
          detail: err.message || err.err.message,
          error: err.err ? err.err.message : err
        };
        console.log(message.error);
        res.status(status).send(message);
      });
    }

    // production error handler (no stacktraces leaked to user)
    app.use((err, req, res, next) => {
      if (!err) return next();
      const status = err.status || 500;
      const message = {
        status: status,
        code: err.code,
        detail: err.message || err.err.message
      };
      res.status(status).send(message);
    });

  };

})(module.exports);
