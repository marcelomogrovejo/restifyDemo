//TODO: figure out how to implement it on db-connection and here

/**
 * User
 */
'use strict';

var config = require('../config/config');
var mysqlModel = require('mysql-model');

var MyAppModel = mysqlModel.createConnection({
  host : config.dbServer.hostname,
  user : config.dbServer.username,
  password : config.dbServer.password,
  database : config.dbServer.database
});

var User = MyAppModel.extend({
    tableName: 'user',
});

module.exports = User;
