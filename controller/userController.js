/**
 * User controller
 */
'use strict';

var conn = require('../config/db-connection.js');
var connection = conn.get;

var userResource = {

    /**
     * Retrieves all the users
     */
    getList : function(req, res, next) {

		console.log('Routing HTTP GET request...');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        //TODO: QUERIE TO MODEL        
        var query = 'SELECT * FROM user';
        connection.query(query, function (error, results) {
            if(error) {
                throw error;
            }
            //console.log(results);
            res.send(200, results);
            return next();
        })
    },

    /**
     * Gets just on user by id
     *
     * param by url :userId
     */
    findOne : function(req, res, next) {
        
        console.log('Routing HTTP GET request...');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        //TODO: QUERIE TO MODEL
        var query = 'SELECT * FROM user WHERE id = '+req.params.userId;
        connection.query(query, function(error, results) {
            if(error) {
                throw error;
            }
            //console.log(results);
            res.send(200, results);
            return next();
        })
    },

    /**
     * Adds a new user
     *
     * Json format:
     * {
     *    "firstName" : "MyName",
     *    "lastName":"MyLastName",
     *    "email":"fnamelname@emailaddress.com"
     * }
     */
    addOne : function(req , res , next) {
        var user = {};
        user.firstName = req.params.firstName;
        user.lastName = req.params.lastName;
        user.email = req.params.email;
        
        console.log('Routing HTTP POST request...');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        //TODO: QUERIE TO MODEL
        var query = 'INSERT INTO user(first_name, last_name, email) VALUES (\''
            +user.firstName+'\', \''
            +user.lastName+'\', \''
            +user.email+'\')';
        connection.query(query, function (error, success) {
                if(error) {
                    throw error;
                }
                //console.log(success);
                res.send(200, success.insertId);
            }
        )
    },

    /**
     * Modifies an existing user
     *
     * param by url :userId
     *
     * Json format:
     * {
     *    "firstName" : "MyName",
     *    "lastName":"MyLastName",
     *    "email":"fnamelname@emailaddress.com"
     * }
     */
    updateOne : function(req , res , next) {
        var user = {};
        user.id = req.params.userId;
        user.firstName = req.params.firstName;
        user.lastName = req.params.lastName;
        user.email = req.params.email;
        
		console.log('Routing HTTP PUT request...');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        //TODO: QUERIE TO MODEL
        var query = 'UPDATE user ' 
            +'SET first_name = \''+user.firstName+'\', '
            +'last_name = \''+user.lastName+'\', '
            +'email = \''+user.email+'\' '
            +'WHERE id =  '+user.id+'';
        connection.query(query, function (error, success) {
                if(error) {
                    throw error;
                }
                //console.log(success);
                res.send(200, success.affectedRows);
            }
        )
    },

    /**
     * Removes an existing user
     *
     * param by url userId
     */
    deleteOne : function(req , res , next) {
        
		console.log('Routing HTTP DELETE request...');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        //TODO: QUERIE TO MODEL
        var query = 'DELETE FROM user WHERE ID = '+req.params.userId+'';
        connection.query(query, function (error, success){
            if(error) {
                throw error;
            }
            res.send(200, 'Remove successfully');
        }) 
    }

}

module.exports = userResource;