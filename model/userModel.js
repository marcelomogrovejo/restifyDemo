/**
 * User
 */
'use strict';

var config = require('../config/config.js');
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

//var user = new User();
//
//user.find('all', {where: "year > 2001"}, function(err, rows, fields) {
//    // Do something...
//});


module.exports = User;
