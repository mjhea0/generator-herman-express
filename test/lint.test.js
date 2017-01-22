const lint = require('mocha-eslint');
const path = require('path');

const paths = [
  path.join(__dirname, '..', 'src', 'server', '**', '*.js'),
  path.join(__dirname, '..', 'src', 'client', '**', '*.js'),
  path.join(__dirname, '..', 'test', '**', '*.js'),
];

const options = {};

// Run the tests
lint(paths, options);
