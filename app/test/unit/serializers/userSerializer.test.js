'use strict';
var logger = require('logger');
var should = require('should');
var assert = require('assert');
var userSerializer = require('serializers/userSerializer');

describe('User serializer test', function () {
  var user = {
    id: '1',
    name: 'Ra',
    age: 28,
    email: 'raul.requero@vizzuality.com',
    role: {
      id: '1',
      name: 'admin'
    }
  };

  var userArray = [{
    id: '1',
    name: 'Ra',
    age: 28,
    email: 'raul.requero@vizzuality.com',
    role: {
      id: '1',
      name: 'admin'
    }
  }, {
    id: '2',
    name: 'Vizzuality',
    age: 10,
    email: 'hello@vizzuality.com',
    role: {
      id: '2',
      name: 'user'
    }
  }];

  before(function* () {

  });

  it('Generate correct jsonapi response (single)', function () {
    let response = userSerializer.serialize(user);
    response.should.not.be.a.Array();
    response.should.have.property('data');
    let data = response.data;
    data.should.have.property('type');
    data.should.have.property('attributes');
    data.type.should.equal('user');
    data.attributes.should.have.property('name');
    data.attributes.name.should.be.equal(user.name);
    data.attributes.should.have.property('email');
    data.attributes.email.should.be.equal(user.email);
    data.attributes.should.have.property('age');
    data.attributes.age.should.be.equal(user.age);
    data.should.have.property('relationships');
    data.relationships.should.have.property('role');
    data.relationships.role.should.have.property('data');
    data.relationships.role.data.should.have.property('id');
    data.relationships.role.data.id.should.equal(user.role.id);

    //included
    response.should.have.property('included');
    let included = response.included;
    included.should.be.a.Array();
    included.should.have.length(1);
    included[0].should.have.property('type');
    included[0].type.should.equal('role');
    included[0].should.have.property('attributes');
    included[0].attributes.should.have.property('name');
  });


  it('Generate correct jsonapi response (array)', function () {
    let response = userSerializer.serialize(userArray);
    response.should.not.be.a.Array();
    response.should.have.property('data');

    response.data.should.be.a.Array();
    response.data.should.length(2);
    let data = response.data[0];
    data.should.have.property('type');
    data.should.have.property('attributes');
    data.type.should.equal('user');
    data.attributes.should.have.property('name');
    data.attributes.name.should.be.equal(userArray[0].name);
    data.attributes.should.have.property('email');
    data.attributes.email.should.be.equal(userArray[0].email);
    data.attributes.should.have.property('age');
    data.attributes.age.should.be.equal(userArray[0].age);
    data.should.have.property('relationships');
    data.relationships.should.have.property('role');
    data.relationships.role.should.have.property('data');
    data.relationships.role.data.should.have.property('id');
    data.relationships.role.data.id.should.equal(userArray[0].role.id);

    //included
    response.should.have.property('included');
    let included = response.included;
    included.should.be.a.Array();
    included.should.have.length(2);
    included[0].should.have.property('type');
    included[0].type.should.equal('role');
    included[0].should.have.property('attributes');
    included[0].attributes.should.have.property('name');
  });
  after(function* () {

  });
});
