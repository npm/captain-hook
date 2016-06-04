const thisFolderName = __dirname.split('/').pop();

const API = require('../../lib/api');

module.exports = new API.Controller({
  model: require('./model'),
  basePath: thisFolderName
});
