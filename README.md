# Herman Express Generator

Just a Node/Express boilerplate, featuring:

1. Component-based Structure
1. Server-side Templating
1. Local Auth
1. Knex query builder
1. Flash Messages
1. Tests
  - Unit
  - Integration
  - Memory Leaks
1. Security
  - Helmet
  - CSRF
1. Express Validator

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

1. Add a new component directory
1. Add the route to *src/server/routes.js*
1. Add tests
1. Add the new views to the config in *src/server/config/main-config.js*

## Heroku Deploy

1. Add Nodemailer
1. Create build
1. PM2

## Todo

1. update memory leak tests
1. update readme (https://github.com/realpython/members)
