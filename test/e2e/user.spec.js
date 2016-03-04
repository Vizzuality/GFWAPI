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
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if(err) {
          throw err;
        }
        res.should.have.status(200);
        done();
      });
  });

  it('Post users with error', function (done) {
    request(url)
      .post('/api/users')
      .send({})
    .end(function (err, res) {
      if(err) {
        throw err;
      }
      logger.debug(res);
      res.should.have.status(400);
      done();
    });
  });

  //TODO: Create test to check headers (jsonapi headers)
  // Accept: application/vnd.api+json --> all request
  // Content-type: application/vnd.api+json -->  (POST, PUT, PATCH)
  // https://github.com/rudijs/koa-jsonapi-headers

  after(function* () {

  });
});
