/**
 * Role router
 */
'use strict';

var mainServer = require('../config/server');
var roleController = require('../controller/roleController');
var config = require('../config/config');

// Define the base url
var PATH = '/roles'

// Define routes
var routes = {

	/**
	 * Manages HTTP GET requests
	 */
	getAll : mainServer.get({path : PATH , version : config.appVersion} , roleController.getList), 

	/**
	 * Manages HTTP GET requests
	 */
	getOne : mainServer.get({path : PATH +'/:roleId' , version : config.appVersion} , roleController.findOne),
	
	/**
	 * Manages HTTP GET requests
	 */
	getOneByName : mainServer.get({path : PATH +'/name/:roleName' , version : config.appVersion} , roleController.findOneByName),

	/**
	 * Manages HTTP POST requests
	 */
	post : mainServer.post({path : PATH , version: config.appVersion} , roleController.addOne),

	/**
	 * Manages HTTP PUT requests
	 */
	put : mainServer.put({path : PATH +'/:roleId' , version: config.appVersion} , roleController.updateOne),

	/**
	 * Manages HTTP DELETE requests
	 */
	del : mainServer.del({path : PATH +'/:roleId' , version: config.appVersion} , roleController.deleteOne)
}

module.exports = routes;