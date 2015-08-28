/**
 * Login model
 */
'use strict';

var config = require('../config/config');
var conn = require('../config/db-connection');
var connection = conn.getMySqlModel;

var Login = connection.extend({
    tableName: 'auth',
});

module.exports = Login;
