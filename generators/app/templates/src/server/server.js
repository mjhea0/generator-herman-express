(() => {

  // *** dependencies *** //
  const app = require('./app');
  const debug = require('debug')('herman-express:server');
  const http = require('http');

  // *** get port *** //
  function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
  }

  // *** set port *** //
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  // *** handle errors ** //
  function onError(error) {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);  // eslint-disable-line no-console
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`); // eslint-disable-line no-console
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  // *** create server *** //
  const server = http.createServer(app);

  // *** start server *** //
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

})();
