/**
 * Login router
 */
'use strict';

var mainServer = require('../config/server');
var roleController = require('../controller/roleController');
var config = require('../config/config');

// Define the base url
var PATH = '/auth'

// Define routes
var routes = {

    /**
     * Gets logged user
	 * 
	 * Method: POST
     */
	getLogin : mainServer.post({path : PATH +'/login', version : config.appVersion} , loginController.getList), 

}

module.exports = routes;