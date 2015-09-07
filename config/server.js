/**
 * Server data
 */
'use strict';

var restify = require('restify');
var config = require('./config');

var startServer = {
	get : restify.createServer({
    	name : "RestFullDemo"
	})
};

var server = startServer.get;
server.use(restify.authorizationParser({
	scheme: 'Basic',
	credentials: '12345'
/*	,
	basic: {
		username: $user,
		password: $password
	}
*/
}));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.listen(config.restServer.port ,config.restServer.ip, function(){
    console.log('%s active in %s ', server.name , server.url);
});

module.exports = server;