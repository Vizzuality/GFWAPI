'use strict';
var logger = require('logger');
var should = require('should');
var shouldHttp = require('should-http');
var assert = require('assert');
var request = require('supertest');


describe('Users API', function () {
  var url = 'http://localhost:3000';

  before(function* () {

  });

  it('Get users', function (done) {
    request(url)
      .get('/api/users')
      .expect('Content-Type', 'application/vnd.api+json')
      .expect(200)
      .end(function (err, res) {
        if(err) {
          throw err;
        }
        res.should.have.status(200);
        res.body.should.have.property('data');
        let data = res.body.data;
        data.should.be.a.Array();
        data.should.have.length(3);
        data[0].should.have.property('type');
        data[0].should.have.property('attributes');
        data[0].type.should.equal('user');
        //included
        res.body.should.have.property('included');
        let included = res.body.included;
        included.should.be.a.Array();
        included.should.have.length(2);
        included[0].should.have.property('type');
        included[0].type.should.equal('role');
        done();
      });
  });

  it('Post empty user (return error)', function (done) {
    request(url)
      .post('/api/users')
      .send({})
      .expect(400)
      .expect('Content-Type', 'application/vnd.api+json')
      .end(function (err, res) {
        if(err) {
          throw err;
        }
        res.body.should.have.property('errors');
        let errors = res.body.errors;
        errors.should.be.a.Array();
        errors.should.length(3);
        errors[0].should.have.property('code');
        errors[0].should.have.property('detail');
        errors[0].should.have.property('source');
        errors[0].should.have.property('title');
        done();
      });
  });

  it('Post user (error email empty)', function (done) {
    request(url)
      .post('/api/users')
      .send({
        name: 'Juan',
        age: 20,
        role: 1
      })
      .expect(400)
      .expect('Content-Type', 'application/vnd.api+json')
      .end(function (err, res) {
        if(err) {
          throw err;
        }
        res.body.should.have.property('errors');
        let errors = res.body.errors;
        errors.should.be.a.Array();
        errors.should.length(1);
        errors[0].should.have.property('code');
        errors[0].should.have.property('detail');
        errors[0].should.have.property('source');
        errors[0].should.have.property('title');
        errors[0].source.should.have.property('parameter');
        errors[0].source.parameter.should.equal('email');
        done();
      });
  });

  it('Post user (error Invalid email)', function (done) {
    request(url)
      .post('/api/users')
      .send({
        name: 'Juan',
        age: 20,
        email: 'juan@',
        role: 1
      })
      .expect(400)
      .expect('Content-Type', 'application/vnd.api+json')
      .end(function (err, res) {
        if(err) {
          throw err;
        }
        res.body.should.have.property('errors');
        let errors = res.body.errors;
        errors.should.be.a.Array();
        errors.should.length(1);
        errors[0].should.have.property('source');
        errors[0].source.should.have.property('parameter');
        errors[0].source.parameter.should.equal('email');
        done();
      });
  });

  it('Post user (error age not number)', function (done) {
    request(url)
      .post('/api/users')
      .send({
        name: 'Juan',
        age: 'asd',
        email: 'juan@gmail.com',
        role: 1
      })
      .expect(400)
      .expect('Content-Type', 'application/vnd.api+json')
      .end(function (err, res) {
        if(err) {
          throw err;
        }
        res.body.should.have.property('errors');
        let errors = res.body.errors;
        errors.should.be.a.Array();
        errors.should.length(1);
        errors[0].should.have.property('source');
        errors[0].source.should.have.property('parameter');
        errors[0].source.parameter.should.equal('age');
        done();
      });
  });

  it('Post user (error role not exist)', function (done) {
    request(url)
      .post('/api/users')
      .send({
        name: 'Juan',
        age: 20,
        email: 'juan@gmail.com',
        role: 1000
      })
      .expect(400)
      .expect('Content-Type', 'application/vnd.api+json')
      .end(function (err, res) {
        if(err) {
          throw err;
        }
        res.body.should.have.property('errors');
        let errors = res.body.errors;
        errors.should.be.a.Array();
        errors.should.length(1);
        errors[0].should.have.property('source');
        errors[0].source.should.have.property('parameter');
        errors[0].source.parameter.should.equal('role');
        done();
      });
  });

  it('Post user Create correct', function (done) {
    let userCreate = {
      name: 'Juan',
      age: 20,
      email: 'juan@gmail.com',
      role: 1
    };
    request(url)
      .post('/api/users')
      .send(userCreate)
      .expect(200)
      .expect('Content-Type', 'application/vnd.api+json')
      .end(function (err, res) {
        if(err) {
          throw err;
        }
        res.body.should.have.property('data');
        let data = res.body.data;

        data.should.have.property('type');
        data.should.have.property('attributes');
        data.type.should.equal('user');
        // serializer send undefined as text
        data.id.should.not.be.equal('undefined');

        let userAttributes = data.attributes;
        userAttributes.name.should.equal(userCreate.name);
        userAttributes.email.should.equal(userCreate.email);
        userAttributes.age.should.equal(userCreate.age);

        data.should.have.property('relationships');
        data.relationships.should.have.property('role');
        data.relationships.role.should.have.property('data');
        data.relationships.role.data.should.have.property('id');
        data.relationships.role.data.id.should.equal(userCreate.role);

        done();
      });
  });

  after(function* () {

  });
});
