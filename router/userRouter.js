/**
 * User router
 */
'use strict';

var passport = require('passport-oauth2');
var oauth2orize = require('oauth2orize');
var mainServer = require('../config/server');
var userController = require('../controller/userController');
var config = require('../config/config');

// Define the base url
var PATH = '/users';
var AUTH_PATH = '/auth';

// Define routes
var routes = {

    /**
     * Find an existent token by username and password 
     */
//    getUserToken : mainServer.post({path : AUTH_PATH+'/login' , version : config.appVersion} , userController.getUserTokenByCredentials),
    
    /**
     * TEST BASIC AUTH with restify internal libs
     */
    getAccessTest : mainServer.post({path : AUTH_PATH+'/login' , version : config.appVersion} , userController.getUserAccessTest),

    /**
     * Retrieves all the users
	 * 
	 * Method: GET
     */
	getAll : mainServer.get({path : PATH , version : config.appVersion} , userController.getList), 

    /**
     * Gets just on user by id
	 * 
	 * Method: GET
     * param by url :userId
     */
	getOne : mainServer.get({path : PATH +'/:userId' , version : config.appVersion} , userController.findOne),

    /**
     * Retrieves all the users and roles that they belong to
     * 
     * Method: GET
     */
    getAllUserAndRoles : mainServer.get({path : PATH +'/roles/all' , version : config.appVersion} , userController.findUsersAndRoles),
    /**
     * Adds a new user
     *
	 * Method: POST
     * Json format:
     * {
     *    "firstName" : "MyName",
     *    "lastName":"MyLastName",
     *    "email":"fnamelname@emailaddress.com"
     * }
     */
	post : mainServer.post({path : PATH , version: config.appVersion} , userController.addOne),

    /**
     * Modifies an existing user
     *
     * Method: PUT
     * param by url :userId
     *
     * Json format:
     * {
     *    "firstName" : "MyName",
     *    "lastName":"MyLastName",
     *    "email":"fnamelname@emailaddress.com"
     * }
     */
	put : mainServer.put({path : PATH +'/:userId' , version: config.appVersion} , userController.updateOne),

    /**
     * Removes an existing user
     *
     * Method: DELETE
     * param by url userId
     */
	del : mainServer.del({path : PATH +'/:userId' , version: config.appVersion} , userController.deleteOne)
}

module.exports = routes;