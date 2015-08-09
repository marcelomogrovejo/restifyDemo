/**
 * MySQL connection
 */
'use strict';

var mysql = require('mysql');
var config = require('./config.js');

var connection = {
	get : mysql.createConnection({
		host : config.dbServer.hostname,
		user : config.dbServer.username,
		password : config.dbServer.password,
		database: config.dbServer.database
    })
};

module.exports = connection;