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
        console.log('Retrieving a token...');
        
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
     * Retrieves a token by user id
     */
    getTokenByUserId : function(userId, success, error) {
        console.log('Retrieving a token for given user...');
        
        var auth = new Authorization();
        auth.find('first', {where : 'user_id = '+userId, and: 'valid = 1'}, function(err, rows, fields) {            
            console.log('1');
            console.log(err);
            if(err) {
                error(err);
            } else {
                console.log('2');
                console.log(rows);
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
    genNewToken : function() {
        console.log('Generatig token...');
        
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        var token = {
            //TODO: research some JS tool for generating hashes
            token : '123abc',
            expirationDate : expirationDate,
            valid : 1
        }
        return token;
    },
    
    /**
     * Save a new token on database
     */
    addToken : function(token, success, error) {
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