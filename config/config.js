/**
 * Main config data
 */
'use strict';

var config = {
	
	appVersion : '0.0.1',

	// MySQL Server	
	dbServer : {
		hostname : 'localhost',
		username : 'restifyusr',
		password : 'restifypass',
		database : 'restify_demo'
	},

	// Rest Server
	// Dev profile
	restServer : {
		ip : 'localhost',
		port : '3130'
	}
	// Prod profile


};

module.exports = config;