/**
 * Authorization controller
 */
'use strict';

var crypto = require('crypto');
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
    genNewToken : function(userId) {
        console.log('Generatig token...');

        //Defines a day from today as expiration date 
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        
        //Generates a random hash
        var hash = crypto.randomBytes(32).toString('hex');

        var token = {
            token : hash,
            expirationDate : expirationDate,
            valid : 1,
            userId : userId
        }
        return token;
    },
    
    /**
     * Save a new token on database
     */
    addToken : function(token, success, error) {
        console.log('Saving token...');

        var auth = new Authorization({
            token : token.token,
            expiration_date : token.expirationDate,
            valid : token.valid,
            user_id : token.userId
        });
        auth.save(function(err, result) {
            if(err) {
                error(err);
            } else {
                success(result);
            }
        });
    }
	
}

module.exports = AuthResource;