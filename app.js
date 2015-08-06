//Init database
var restify = require('restify');
var mysql = require('mysql');
connection = mysql.createConnection({
	host : 'localhost',
        user : 'restifyusr',
        password : 'restifypass',
        database: 'restify_demo'
});

//Init server
var ip_addr = '127.0.0.1';
var port    =  '3130';
var server = restify.createServer({
    name : "usuarios"
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.listen(port ,ip_addr, function(){
    console.log('%s activo en %s ', server.name , server.url);
});

//Define requests
var PATH = '/users'
server.get({path : PATH , version : '0.0.1'} , findAllUsers);
server.get({path : PATH +'/:userId' , version : '0.0.1'} , findUser);
//server.post({path : PATH , version: '0.0.1'} , postNewUser);
//server.del({path : PATH +'/:userId' , version: '0.0.1'} , deleteUser);

//List all users
function findAllUsers(req, res, next){
    connection.query('SELECT * FROM user', function (error, results){
      if(error) {
	  throw error;
      }
      //console.log(results);
      res.send(200, results);
      return next();
  });
}

//Get just one user
function findUser(req, res, next){
    connection.query('SELECT * FROM user WHERE ID='+req.params.userId, function(error, results){
        if(error) {
	    throw error;
        }
        //console.log(results);
        res.send(200, results);
        return next();
    });
}

