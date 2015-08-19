/**
 * Role model
 */
'use strict';

var config = require('../config/config');
var conn = require('../config/db-connection');
var connection = conn.getMySqlModel;

var Role = connection.extend({
    tableName: 'role',
});

module.exports = Role;
