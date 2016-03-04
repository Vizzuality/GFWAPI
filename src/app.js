'use strict';
//load modules
var config = require('config');
var logger = require('logger');
var path = require('path');
var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var koaLogger = require('koa-logger');
var loader = require('loader');
var validate = require('koa-validate');

// instance of koa
var app = koa();

//if environment is dev then load koa-logger
if(process.env.NODE_ENV === 'dev') {
    app.use(koaLogger());
}

app.use(bodyParser());

app.use(validate());

//load routes
loader.loadRoutes(app);

//Instance of http module
var server = require('http').Server(app.callback());

// get port of environment, if not exist obtain of the config.
// In production environment, the port must be declared in environment variable
var port = process.env.PORT || config.get('server.port');

// Listen in port and localhost. Only localhost because by security, this microservice is only accesible from the same machine
server.listen(port, 'localhost');

logger.info('Server started in port:' + config.get('server.port'));
