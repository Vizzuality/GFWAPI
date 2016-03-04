'use strict';

var Router = require('koa-router');
var logger = require('logger');
var UserValidator = require('validators/userValidator');

var router = new Router({
    prefix: '/users'
});


class UserRouter {

  static * getUsers(){

  }

  static * createUser(){

  }

}

router.get('/', UserRouter.getUsers);
router.post('/', UserValidator.create, UserRouter.createUser);

module.exports = router;
