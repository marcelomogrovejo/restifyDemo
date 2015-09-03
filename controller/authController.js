/**
 * Authorization controller
 */
'use strict';

var Authorization = require('../model/authModel');

var AuthResource = {

    /**
     * Retrieves a token by id
     */
    getTokenById : function(id, success, error) {
        var auth = new Authorization();
        auth.find('first', {where : 'id = '+id, and: 'valid = 1'}, function(err, rows, fields) {            
            if(err) {
                error(err);
            } else {
                success({
                    token: rows.token,
                    expirationDate: rows.expiration_date
                });   
            }                      
        });
    },
    
    /**
     * Generates a new token
     */
    genNewToken : function(id, success) {
        var token = '123abc';
        success(token);
    },
    
    /**
     * Save a new token on database
     */
    addToken : function(token) {
        console.log('Adding token...');
/*
        var token = new Token({
            name : req.params.roleName
        });
        role.save(function(error, success) {
            if(error) {
                throw error;
            }
            res.send(200, success.insertId);
        });
*/ 
    }
	
}

module.exports = AuthResource;