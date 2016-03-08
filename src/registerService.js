'use strict';
var config = require('config');
var logger = require('logger');
var request = require('co-request');
var url = require('url');
var co = require('co');
var slug = require('slug');
var idService = null;
var apiGatewayUri = process.env.API_GATEWAY_URI || config.get('apiGateway.uri');

var unregister = function* () {
    logger.info('Unregistering service ', idService);
    try {
        let result = yield request({
            uri: apiGatewayUri + '/' + idService,
            method: 'DELETE'
        });
        if(result.statusCode !== 200) {
            logger.error('Error unregistering service');
            process.exit();
        }
        logger.info('Unregister service correct!');
        process.exit();
    } catch(e) {
        logger.error('Error unregistering service');
        process.exit();
    }
};

var exitHandler = function (signal) {
    logger.error('Signal', signal);
    process.exit();
    // co(function* () {
    //     yield unregister();
    // });
};

var loadRegisterFile = function(){
    var registerData = JSON.stringify(require('register.json'));    
    return JSON.parse(registerData.replace(/#\(service.id\)/g, config.get('service.id'))
        .replace(/#\(service.name\)/g, config.get('service.name'))
        .replace(/#\(service.uri\)/g, config.get('service.uri')));
}

var register = function () {
    var pack = require('../package.json');
    co(function* () {
        if(process.env.SELF_REGISTRY) {
            logger.info('Registering service in API Gateway...');
            let serviceConfig = loadRegisterFile();
            logger.debug(serviceConfig);
            try {

                let result = yield request({
                    uri: apiGatewayUri,
                    method: 'POST',
                    json: true,
                    body: serviceConfig
                });

                if(result.statusCode !== 200) {
                    logger.error('Error registering service:', result);
                    process.exit();
                } else {
                    idService = result.body._id;
                }

                logger.info('Register service in API Gateway correct!');
                process.on('exit', exitHandler.bind(this, 'exit'));
                process.on('SIGINT', exitHandler.bind(this, 'SIGINT'));
                process.on('SIGTERM', exitHandler.bind(this, 'SIGTERM'));
                // process.on('SIGKILL', exitHandler.bind(this, 'SIGKILL'));
                process.on('uncaughtException', exitHandler.bind(this, 'uncaughtException'));

            } catch(e) {
                logger.error('Error registering service2', e);
                process.exit();
            }
        }
    });

};

module.exports = register;
