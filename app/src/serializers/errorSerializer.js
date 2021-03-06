'use strict';

var logger = require('logger');
var JSONAPISerializer = require('jsonapi-serializer').Serializer;



class ErrorSerializer {

    static serializeValidationError(data, typeParam) {
        let keys = Object.keys(data);
        var message = '';
        switch(typeParam) {
        case 'body':
            message = 'Invalid body parameter';
            break;
        case 'query':
            message = 'Invalid query parameter';
            break;
        default:
            message = '';
        }

        return {
          source:{
            parameter: keys[0]
          },
          code: message.replace(/ /g, '_').toLowerCase(),
          title: message,
          detail: data[keys[0]]
        };
      }

    static serializeValidationBodyErrors(data) {
        var errors = [];
        if(data) {
            for(let i = 0, length = data.length; i < length; i++) {
                errors.push(ErrorSerializer.serializeValidationError(data[i], 'body'));
            }
        }
        return {
            errors: errors
        };
    }
    static serializeError(status, message) {
        return {
            errors: [{
                status: status,
                detail: message
            }]
        };
    }
}

module.exports = ErrorSerializer;
