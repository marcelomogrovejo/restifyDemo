/**
 * Role controller
 */
'use strict';

var Role = require('../model/roleModel');

var roleResource = {

    /**
     * Retrieves all the roles
     */
    getList : function(req, res, next) {
		console.log('Routing HTTP GET request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var role = new Role();
        role.find('all', function(err, rows, fields) {
            if(err) {
                throw err;
            }
            res.send(200, rows);
            return fields;
        });
    },

    /**
     * Gets just one role by id
     *
     * param by url :roleId
     */
    findOne : function(req, res, next) {
        console.log('Routing HTTP GET request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var role = new Role();
        role.find('all', {where : 'id = '+req.params.roleId}, function(err, rows, fields) {
            if(err) {
                throw err;
            }
            res.send(200, rows);
            return fields;
        });
    },

    /**
     * Gets just one role by name
     *
     * param by url :roleName
     */
    findOneByName : function(req, res, next) {
        console.log('Routing HTTP GET request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var role = new Role();
        role.find('all', {where : 'name LIKE \'%'+req.params.roleName+'%\''}, function(err, rows, fields) {
            if(err) {
                throw err;
            }
            res.send(200, rows);
            return fields;
        });
    },

    /**
     * Adds a new role
     *
     * Json format:
     * {
     *    "roleName" : "MyRole"
     * }
     */
    addOne : function(req , res , next) {
        console.log('Routing HTTP POST request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var role = new Role({
            name : req.params.roleName
        });
        role.save(function(error, success) {
            if(error) {
                throw error;
            }
            res.send(200, success.insertId);
        });
    },

    /**
     * Modifies an existing role
     *
     * param by url :roleId
     *
     * Json format:
     * {
     *    "roleName" : "MyRole"
     * }
     */
    updateOne : function(req , res , next) {
		console.log('Routing HTTP PUT request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var role = new Role({
            name : req.params.roleName
        });
        role.set('id', req.params.roleId);
        role.save(function(error, success) {
            if(error) {
                throw error;
            }
            res.send(200, success.affectedRows);
        });

    },

    /**
     * Removes an existing role
     *
     * param by url roleId
     */
    deleteOne : function(req , res , next) {
		console.log('Routing HTTP DELETE request...');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        var role = new Role();
        role.set('id', req.params.roleId);
        role.remove(function(error, success) {
            if(error) {
                throw error;
            }
            res.send(200, 'Remove successfully');
        });
    }

}

module.exports = roleResource;