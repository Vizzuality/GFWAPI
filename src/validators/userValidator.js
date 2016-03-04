'use strict';
var logger = require('logger');
var ErrorSerializer = require('serializers/ErrorSerializer');

class UserValidator {

  static * create(next) {
    logger.debug('Validate create user');
    this.checkBody('name').notEmpty().len(2, 30);
    this.checkBody('surname').notEmpty().len(2, 30);
    this.checkBody('age').notEmpty().isInt();
    this.checkBody('role').notEmpty().isInt();
    if(this.errors) {
      logger.debug('errors ', this.errors);
      this.body = ErrorSerializer.serializeValidationBodyErrors(this.errors);
      this.status = 400;
      return; 
    } else {
      yield next;
    }
  }

}

module.exports = UserValidator;
