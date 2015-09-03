/**
 * Authorization model
 */
'use strict';

var config = require('../config/config');
var conn = require('../config/db-connection');
var connection = conn.getMySqlModel;

var Authorization = connection.extend({
    tableName: 'auth',
});

module.exports = Authorization;