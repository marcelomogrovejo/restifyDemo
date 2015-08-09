/**
 * User controller
 */
'use strict';

var User = require('../model/userModel.js');
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

        // Without model - WORKS! 
//        var query = 'SELECT * FROM user';
//        connection.query(query, function (error, results) {
//            if(error) {
//                throw error;
//            }
//            //console.log(results);
//            res.send(200, results);
//            return next();
//        })

        // With model - WORKS!
        var usr = new User();
        usr.find('all', function(err, rows, fields) {
            if(err) {
                throw err;
            }
            res.send(200, rows);
            return fields;
        });
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

        // Without model - WORKS!
//        var query = 'SELECT * FROM user WHERE id = '+req.params.userId;
//        connection.query(query, function(error, results) {
//            if(error) {
//                throw error;
//            }
//            //console.log(results);
//            res.send(200, results);
//            return next();
//        })

        // With model - WORKS!
        var usr = new User();
        usr.find('all', {where : 'id = '+req.params.userId}, function(err, rows, fields) {
            if(err) {
                throw err;
            }
            res.send(200, rows);
            return fields;
        });
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

        // Without model - WORKS!
//        var query = 'INSERT INTO user(first_name, last_name, email) VALUES (\''
//            +user.firstName+'\', \''
//            +user.lastName+'\', \''
//            +user.email+'\')';
//        connection.query(query, function (error, success) {
//                if(error) {
//                    throw error;
//                }
//                //console.log(success);
//                res.send(200, success.insertId);
//            }
//        )

        // With model - WORKS!
        var usr = new User({
            first_name : user.firstName,
            last_name : user.lastName,
            email : user.email
        });
        usr.save(function(error, success) {
            if(error) {
                throw error;
            }
            res.send(200, success.insertId);
        });
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

        // Without model - WORKS!
//        var query = 'UPDATE user ' 
//            +'SET first_name = \''+user.firstName+'\', '
//            +'last_name = \''+user.lastName+'\', '
//            +'email = \''+user.email+'\' '
//            +'WHERE id =  '+user.id+'';
//        connection.query(query, function (error, success) {
//                if(error) {
//                    throw error;
//                }
//                //console.log(success);
//                res.send(200, success.affectedRows);
//            }
//        )
        
        // With model - ??
        var usr = new User({
            first_name : user.firstName,
            last_name : user.lastName,
            email : user.email
        });
        usr.set('id', user.id);
        usr.save(function(error, success) {
            if(error) {
                throw error;
            }
            res.send(200, success.affectedRows);
        });

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

        // Without model - WORKS!
//        var query = 'DELETE FROM user WHERE ID = '+req.params.userId+'';
//        connection.query(query, function (error, success){
//            if(error) {
//                throw error;
//            }
//            res.send(200, 'Remove successfully');
//        })

        // With model - WORKS!
        var usr = new User();
        usr.set('id', req.params.userId);
        usr.remove(function(error, success) {
            if(error) {
                throw error;
            }
            res.send(200, 'Remove successfully');
        });
    }

}

module.exports = userResource;