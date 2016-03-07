'use strict';
var logger = require('logger');
var ErrorSerializer = require('serializers/ErrorSerializer');
var roles = require('../../example.json').roles;


class UserValidator {

  static checkRole(role){
    logger.debug('Check role', role);
    if(!roles[role]){
      return false;
    } else {
      return true;
    }
  }

  static * create(next) {
    logger.debug('Validate create user');
    this.checkBody('name').notEmpty().len(2, 30);
    this.checkBody('email').notEmpty().isEmail();
    this.checkBody('age').optional().isInt().toInt();
    this.checkBody('role').notEmpty().isInt().toInt();
    if(this.errors) {
      logger.debug('errors ', this.errors);
      this.body = ErrorSerializer.serializeValidationBodyErrors(this.errors);
      this.status = 400;
      return;
    } else {
      logger.debug('Validating role exists');
      if(!UserValidator.checkRole(this.request.body.role)){
        this.body = ErrorSerializer.serializeValidationBodyErrors([{role: 'Role not exist'}]);
        this.status = 400;
        return;
      }
      logger.debug('Validate correct!');
      yield next;
    }
  }

}

module.exports = UserValidator;
