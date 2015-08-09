/* PENDING: QUERIES TO MODELS */


/**
 * User controller
 */
use 'strict';

var conn = require('../config/db-connection.js');
var connection = conn.get;

var userResource = {

    /**
     * Retrieves all the users
     */
    getList : function(req, res, next) {
        connection.query('SELECT * FROM user', function (error, results) {
            if(error) {
                throw error;
            }
            console.log(results);
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
        connection.query('SELECT * FROM user WHERE ID='+req.params.userId, function(error, results) {
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
        
        connection.query('INSERT INTO user(first_name, last_name, email) VALUES (\''
            +user.firstName+'\', \''
            +user.lastName+'\', \''
            +user.email+'\', \')'
            , function (error, success) {
                if(error) {
                    throw error;
                }
                console.log(success);
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
        
        connection.query('UPDATE user SET 
            first_name = \''+user.firstName+'\',
            , last_name = \''+user.lastName+'\',
            , email = \''+user.email+'\' WHERE id =  '+user.id+''
            , function (error, success) {
                if(error) {
                    throw error;
                }
                console.log(success);
                res.send(200, success.afectedRows);
            }
        )
    },

    /**
     * Removes an existing user
     *
     * param by url userId
     */
    deleteOne : function(req , res , next) {
        connection.query('DELETE FROM user WHERE ID = '+req.params.userId, function (error, success){
            if(error) {
                throw error;
            }
            res.send(200, 'Remove successfully');
        }) 
    }

}

module.exports = userResource;