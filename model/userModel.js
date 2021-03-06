/**
 * User model
 */
'use strict';

var config = require('../config/config');
var conn = require('../config/db-connection');
var connection = conn.getMySqlModel;

var User = connection.extend({
    tableName: 'user',
});

module.exports = User;
