((appConfig) => {

  // *** main dependencies *** //
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const compression = require('compression');
  const helmet = require('helmet');
  const cors = require('cors');
  const session = require('express-session');
  const flash = require('connect-flash');
  const morgan = require('morgan');
  const nunjucks = require('nunjucks');
  const expressValidator = require('express-validator');
  const passport = require('passport');

  // *** view folders *** //
  const viewFolders = [
    path.join(__dirname, '..', 'views'),
    path.join(__dirname, '..', 'components', 'main'),
    path.join(__dirname, '..', 'components', 'users', 'views'),
  ];

  // *** load environment variables *** //
  require('dotenv').config();

  appConfig.init = (app, express) => { // eslint-disable-line no-param-reassign

    // *** view engine *** //
    nunjucks.configure(viewFolders, {
      express: app,
      autoescape: true,
    });
    app.set('view engine', 'html');

    // *** app middleware *** //
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));
    }
    app.use(cors());
    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());
    app.use(cookieParser());
    app.use(session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, '..', '..', 'client')));

  };

})(module.exports);
