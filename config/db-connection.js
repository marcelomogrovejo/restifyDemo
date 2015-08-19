/**
 * MySQL connection
 */
'use strict';

var mysql = require('mysql');
var mysqlModel = require('mysql-model');
var config = require('./config');

var connection = {
	getMySql : mysql.createConnection({
		host : config.dbServer.hostname,
		user : config.dbServer.username,
		password : config.dbServer.password,
		database: config.dbServer.database
    }),
	
	getMySqlModel : mysqlModel.createConnection({
		host : config.dbServer.hostname,
		user : config.dbServer.username,
		password : config.dbServer.password,
		database : config.dbServer.database
	})
};

module.exports = connection;