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

## New Component?

Steps for setting up a new component:

1. Add a new component directory
1. Add the route to *src/server/routes.js*
1. Add tests
1. Add the new views to the config in *src/server/config/main-config.js*

## Heroku Deploy

1. Add Nodemailer
1. Create build

## Todo

1. update https://github.com/mjhea0/passport-local-knex/pull/2
1. https://github.com/realpython/members
1. airbnb linter
1. isoldate tests (unit vs integration for code coverage)
1. validatior
