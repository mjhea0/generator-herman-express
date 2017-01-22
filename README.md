# Herman Express Generator

Just a Node/Express boilerplate, featuring:

1. A component-based structure ([example](./src/server/components/users))
1. Server-side Templating via [Nunjucks](https://mozilla.github.io/nunjucks/)
1. [Local Auth](src/server/auth/strategies/local.js) via [Passport](http://passportjs.org/)
1. [Knex](http://knexjs.org/) query builder
1. [Flash Messages](https://github.com/jaredhanson/connect-flash)
1. Tests
  - Unit
  - Integration
  - Memory Leaks (use with helper functions) via [leakage](https://github.com/andywer/leakage)
  - [Istanbul](https://github.com/gotwarlost/istanbul) for code coverage
1. [Airbnb JavaScript Linter](https://github.com/airbnb/javascript)
1. Security
  - [Helmet](https://github.com/helmetjs/helmet)
  - [CSRF](https://github.com/expressjs/csurf)
  - [Express Validator](https://github.com/ctavan/express-validator)

## Getting Started

1. Fork/Clone
1. Install dependencies
1. Rename *.env-sample* to *.env* and then update the variables
1. Create the development and test Postgres DBs:
  - `createdb plato`
  - `createdb members_test`
1. Run development migrations:
  - `knex migrate:latest --env development`
1. Run seed:
  - `knex seed:run --env development`
1. Run server
  - `gulp`

## Test

All tests:

```sh
$ npm test
```

Leakage tests:

```sh
$ npm run leaks
```

Coverage:

```sh
$ npm run coverage
$ npm run coverage-unit
$ npm run coverage-integration
```

## New Component?

Steps for setting up a new component:

1. Add a new component directory to "src/server/components"
1. Add the route to *src/server/routes.js*
1. Add the new views to the `viewFolders` array in *src/server/config/main-config.js*
1. Add tests

## Todo

1. update yeoman
