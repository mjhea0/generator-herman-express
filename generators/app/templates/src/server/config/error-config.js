((errorConfig) => {

  // *** error handling *** //

  errorConfig.init = (app) => {       // eslint-disable-line no-param-reassign

    // print out stack for javascript exception
    process.on('uncaughtException', (err) => {
      console.error(err);             // eslint-disable-line no-console
      process.exit();
    });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      const err = new Error('Not Found.');
      err.status = 404;
      return next(err);
    });

    // handle csrf errors specifically
    app.use((err, req, res, next) => {
      if (err.code !== 'EBADCSRFTOKEN') return next(err);
      return res.status(403).json({
        error: 'session has expired or tampered with',
      });
    });

    // development error handler (will print stacktrace)
    if (app.get('env') === 'development') {
      app.use((err, req, res, next) => {
        if (!err) return next();
        console.log(err);         // eslint-disable-line no-console
        const status = err.status || 500;
        const message = {
          status,
          stack: err.stack,
          code: err.code,
          detail: err.message || err.err.message,
          error: err.err ? err.err.message : err,
        };
        return res.status(status).send(message);
      });
    }

    // production error handler (no stacktraces leaked to user)
    app.use((err, req, res, next) => {
      if (!err) return next();
      const status = err.status || 500;
      const message = {
        status,
        code: err.code,
        detail: err.message || err.err.message,
      };
      return res.status(status).send(message);
    });

  };

})(module.exports);
