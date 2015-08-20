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
     * Retrieves all the roles
	 * 
	 * Method: GET
     */
	getAll : mainServer.get({path : PATH , version : config.appVersion} , roleController.getList), 

    /**
     * Gets just one role by id
     *
	 * Method: GET
     * param by url :roleId
     */
	getOne : mainServer.get({path : PATH +'/:roleId' , version : config.appVersion} , roleController.findOne),
	
    /**
     * Gets just one role by name
     *
	 * Method: GET
     * param by url :roleName
     */
	getOneByName : mainServer.get({path : PATH +'/name/:roleName' , version : config.appVersion} , roleController.findOneByName),

    /**
     * Adds a new role
     *
	 * Method: POST
     * Json format:
     * {
     *    "roleName" : "MyRole"
     * }
     */
	post : mainServer.post({path : PATH , version: config.appVersion} , roleController.addOne),

    /**
     * Modifies an existing role
     *
     * Method: PUT
     * param by url :roleId
     *
     * Json format:
     * {
     *    "roleName" : "MyRole"
     * }
     */
	put : mainServer.put({path : PATH +'/:roleId' , version: config.appVersion} , roleController.updateOne),

    /**
     * Removes an existing role
     *
     * Method: DELETE
     * param by url roleId
     */
	del : mainServer.del({path : PATH +'/:roleId' , version: config.appVersion} , roleController.deleteOne)
}

module.exports = routes;