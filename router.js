/**
 * Router
 */
'use strict';

var mainServer = require('config/server.js');
var userController = require('controller/userController.js');

// Define the base url
var PATH = '/users'

//var controller = userController.userResource;

// Define routes
var routes = {

	//controller : ('controller/userController.js'),
	controller : userController.userResource,

	/**
	 * Manages HTTP GET requests
	 */
	get : mainServer.get({path : PATH , version : '0.0.1'} , function() {
		console.log('Routing GET request...');

        /*
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		*/

		var kk = controller.getList;

		;
	}),

	/**
	 * Manages HTTP POST requests
	 */
	post : mainServer.post({path : PATH , version: '0.0.1'} , function() {
		console.log('Routing POST request...');

		/*
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		*/
		controller.addOne;
	}),

	/**
	 * Manages HTTP PUT requests
	 */
	put : mainServer.put({path : PATH +'/:userId' , version: '0.0.1'} , function() {
		console.log('Routing PUT request...');

		/*
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		*/
		controller.updateOne
	}),

	/**
	 * Manages HTTP DEL requests
	 */
	del : mainServer.del({path : PATH +'/:userId' , version: '0.0.1'} , function() {
		console.log('Routing DELETE request...');

		/*
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		*/
		controller.deleteOne;
	})
}

module.exports = routes;