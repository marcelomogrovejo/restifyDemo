/**
 * User controller
 */
'use strict';

var User = require('../model/userModel');
var Auth = require('./authController');

var UserResource = {

    /**
     * Find user by credentials
     */
    getUserByCredentials : function(req, res, next) {
        console.log('Routing HTTP GET AUTHORIZATION request...');
        
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
                if (rows.auth_id) {
                    Auth.getTokenById(rows.auth_id, function(token) {
                        var currentDate = new Date();
                        //FIXME temporal until the method addToken generates a valid expiration date
                        var expirationDate = token.expirationDate;
                        expirationDate.setDate(expirationDate.getDate() + 1);
                        if(expirationDate.getTime() < currentDate.getTime()) {
                            throw('Invalid token');
                        }
                        res.send(200, token.token);
                    }, function(err) {
                        throw(err);
                    });
                } else {
                    Auth.genNewToken(rows.id, function(token) {
                        //4. save the new one on db
                        /* TODO: increment 1 day to currentDate to create expirationDate
                            1. Using just JavaScript's Date object (no libraries):                        
                                var tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                            2. Using MomentJS:
                                var today = moment();
                                var tomorrow = moment(today).add('days', 1);
                            3. Using DateJS, but it hasn't been updated in a long time:
                                var today = new Date(); // Or Date.today()
                                var tomorrow = today.add(1).day();
                        */
                        Auth.addToken(token);
                        res.set(200, token);
                    });
                }
            }
        });
    },

    /**
     * Retrieves all the users
     */
    getList : function(req, res, next) {
		console.log('Routing HTTP GET request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

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
    }

}

module.exports = UserResource;