/* eslint-disable */
if (process.env.NODE_END === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
