/**
 * Router
 */
'use strict';

var mainServer = require('./config/server');
var userController = require('./controller/userController');
var config = require('./config/config');

// Define the base url
var PATH = '/users'

// Define routes
var routes = {

	/**
	 * Manages HTTP GET requests
	 */
	getAll : mainServer.get({path : PATH , version : config.appVersion} , userController.getList), 

	/**
	 * Manages HTTP GET requests
	 */
	getOne : mainServer.get({path : PATH +'/:userId' , version : config.appVersion} , userController.findOne),

	/**
	 * Manages HTTP POST requests
	 */
	post : mainServer.post({path : PATH , version: config.appVersion} , userController.addOne),

	/**
	 * Manages HTTP PUT requests
	 */
	put : mainServer.put({path : PATH +'/:userId' , version: config.appVersion} , userController.updateOne),

	/**
	 * Manages HTTP DEL requests
	 */
	del : mainServer.del({path : PATH +'/:userId' , version: config.appVersion} , userController.deleteOne)
}

module.exports = routes;