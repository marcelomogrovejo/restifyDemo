/**
 * Login controller
 */
'use strict';

var Login = require('../model/roleModel');

var loginResource = {

    /**
     * Gets user login access
     */
    getAccess : function(req, res, next) {
		console.log('Routing HTTP POST request...');

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

}

module.exports = loginResource;