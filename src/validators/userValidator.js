'use strict';
var logger = require('logger');

class UserValidator {

  static * create(next){
    yield next;
  }

}

module.exports = UserValidator;
