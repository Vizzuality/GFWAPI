'use strict';

var logger = require('logger');
var JSONAPISerializer = require('jsonapi-serializer').Serializer;
var userSerializer = new JSONAPISerializer('user', {
    attributes: ['name', 'email', 'age', 'role'],
    role: {
        attributes: ['name'],
        ref: function (user, rol) {
            return rol.id;
        }
    },
    typeForAttribute: function (attribute, record) {
        return attribute;
    }
});

class UserSerializer {

  static serialize(data) {
    return userSerializer.serialize(data);
  }
}

module.exports = UserSerializer;
