/**
 * Authorization controller
 */
'use strict';

var crypto = require('crypto');
var Authorization = require('../model/authModel');
var User = require('./userController');
var dateUtil = require('../helper/dateUtil');

var AuthResource = {

    /**
     * Checks if token is valid and has not expired.
     */
    isValidToken : function(username, token) {
        //FIXME: research better strategy. How to know if toke begin an existent user.
        
        var valid = false;
        //TODO:
        //1. search token in auth table where valid = 1
        this.getTokenByToken(token, function(result) {
            //2. if exists, checks expiration date
            if(!dateUtil.isExpiredDate(result.expiration_date)) {
                //3. if not expired jet, gets user by userId
                User.getUserById(result.user_id, function(res) {
                    //4. checks usrname
                    if(res.username === username) {
                        valid = true;
                    } 
                }, function(err) {
                    
                });
            }
            //4. if expired, return false or error
        }, function(err) {
            //5. if not exists, return false or error
        });
        return valid;
    },
    
    /**
     * Retrieves a token object from db
     */
    getTokenByToken : function(token, success, error) {
        console.log('Retrieving a token...');
        
        var auth = new Authorization();
        auth.find('first', {where : 'token = \''+token+'\'', and : 'valid = 1'}, function(err, rows, fields) {
            if(err) {
                error(err);
            } else {
                success(rows);
            }
        }); 
    },
   
    /**
     * Retrieves a token by id
     */
    getTokenById : function(id, success, error) {
        console.log('Retrieving a token...');
        
        var auth = new Authorization();
        auth.find('first', {where : 'id = '+id, and : 'valid = 1'}, function(err, rows, fields) {            
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
                if(!rows) {
                    error(err);
                }
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