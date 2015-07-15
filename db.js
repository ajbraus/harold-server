/*
 * DATABASE CONFIG
 */

var config    = require('./config'),
    mongoose  = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.ENVIRONMENT.db);
  require('./models/article');
  require('./models/campaign');
  require('./models/user');
  
  return db;
};