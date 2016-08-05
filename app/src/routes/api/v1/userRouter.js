'use strict';

var Router = require('koa-router');
var logger = require('logger');
var UserValidator = require('validators/userValidator');
var UserSerializer = require('serializers/userSerializer');

//only for the example
var users = require('../../../../example.json').users;
var roles = require('../../../../example.json').roles;


var router = new Router({
    prefix: '/users'
});


class UserRouter {

  static * getUsers(){
    logger.debug('Getting users');
    this.body = UserSerializer.serialize(users);
  }

  static * createUser(){
    logger.debug('Creating user');
    var user = this.request.body;
    user.role = roles[user.role];
    user.id = users.length + 1;
    users.push(user);
    this.body = UserSerializer.serialize(user);
  }

}

router.get('/', UserRouter.getUsers);
router.post('/', UserValidator.create, UserRouter.createUser);

module.exports = router;
