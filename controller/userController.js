/**
 * User controller
 */
'use strict';

var User = require('../model/userModel');
var Auth = require('./authController');

var UserResource = {

    /**
     * Retrieves an existing and valid token or creates a new one, depending on user credentials.
     */
    getTokenByCredentials : function(req, res, next) {
        console.log('Routing HTTP POST AUTHORIZATION request...');
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var usr = new User();
        usr.find('first', {
                where : 'username = \''+req.params.username+'\'',
                and : 'password = \''+req.params.password+'\'' 
        }, function(err, rows, fields) {
            if(err) {
                throw err;
            }
            if(rows) {
                Auth.getTokenByUserId(rows.id, function(token) {
                    //Exist toke for user, check expiration date
                    var currentDate = new Date();
                    //FIXME temporal until the method addToken generates a valid expiration date
                    var expirationDate = token.expirationDate;
                    expirationDate.setDate(expirationDate.getDate() + 1);
                    if(expirationDate.getTime() < currentDate.getTime()) {
                        throw('ERROR: Invalid token');
                    }
                    res.send(200, token.token);
                }, function(err) {
                    //Non existent token, generates a new one
                    var token = Auth.genNewToken(rows.id);
                    Auth.addToken(token, function(success) {
                        res.send(200, token.token);
                    }, function(err) {
                        throw('ERROR: Token not generated');
                    });
                });
            }
        });
    },

    /**
     * Retrieves all the users
     */
    getList : function(req, res, next) {
		console.log('Routing HTTP POST request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        //TODO: check if req.token is a valid and not expired token
        Auth.isValidToken(req.params.username, req.params.token);

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
     * Retrieves all the users and roles that they belong to
     */
    findUsersAndRoles : function(req, res, next) {
		console.log('Routing HTTP GET request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var qry = 'SELECT '
                    +'u.id AS user_id, '
                    +'u.first_name, '
                    +'u.last_name, '
                    +'u.email, '
                    +'u.role_id, '
                    +'r.id AS role_id, '
                    +'r.name FROM user u '
                    +'INNER JOIN role r ON r.id = u.role_id';
        var usr = new User();
        usr.query(qry, function(err, rows, fields) {
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

        var usr = new User();
        usr.find('first', {where : 'id = '+req.params.userId}, function(err, rows, fields) {
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
        console.log('Routing HTTP POST request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var usr = new User({
            first_name : req.params.firstName,
            last_name : req.params.lastName,
            email : req.params.email
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
		console.log('Routing HTTP PUT request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var usr = new User({
            first_name : req.params.firstName,
            last_name : req.params.lastName,
            email : req.params.email
        });
        usr.set('id', req.params.userId);
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

        var usr = new User();
        usr.set('id', req.params.userId);
        usr.remove(function(error, success) {
            if(error) {
                throw error;
            }
            res.send(200, 'Remove successfully');
        });
    },
    
    /**
     * Retrieves an existent user by its id
     */
    getUserById : function(id, success, error) {
        console.log('Retrieving user...');
        
        var usr = new User();
        usr.find('first', {where : 'id = '+id}, function(err, rows, fields) {
            if(err) {
                throw err;
            } else {
                rows(rows);
            }
        });
    }

}

module.exports = UserResource;