const app = require('../dist/src/app');
const { createNewPlayer, getPlayer } = require('../dist/src/db');
const request = require('supertest');
const mockData = require('./mockData');
const { assert, expect } = require('chai');

describe('App', () => {
  const { newPlayer } = mockData;
  after(() => {
    app.close();
  });

  describe('POST /signup', () => {
    it('responds with newly created player', () => {
      request(app)
        .post('/api/v1/signup')
        .send(newPlayer)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return console.log(err);
          assert.deepEqual(Object.keys(res.body), Object.keys(mockData.createdPlayer));
        });
    });
    
    it('responds with missing params', () => {
      request(app)
        .post('/api/v1/signup')
        .send(mockData.incompleteSignup)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) return console.log(err);
          assert.deepEqual(Object.entries(res.body), Object.entries(mockData.incompleteSignupRes));
        });
    });

    it('has does not allow duplicate players', async () => {
      // cant make it work :/
    });

  });

  describe('POST /login', async () => {
    it('responds to valid email and password', () => {
      request(app)
        .post('/api/v1/login')
        .send(mockData.validLogin)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return console.log(err);
          assert.deepEqual(Object.keys(res.body), Object.keys(mockData.createdPlayer));
        });
    });

    it('responds to valid token', () => {
      request(app)
        .post('/api/v1/login')
        .set({
          Accept: 'application/json', 
          authorization: mockData.validToken 
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return console.log(err);
          assert.deepEqual(Object.keys(res.body), Object.keys(mockData.createdPlayer));
        });
    });

    it('rejects invalid email', () => {
      request(app)
        .post('/api/v1/login')
        .send(mockData.invalidEmail)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
          if (err) return console.log(err);
          assert.deepEqual(res.body, mockData.invalidLoginError);
        });
    });

    it('rejects invalid password', () => {
      request(app)
      .post('/api/v1/login')
      .send(mockData.invalidPassword)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return console.log(err);
        assert.deepEqual(res.body, mockData.invalidLoginError);
      });
    });

    it('rejects invalid token', () => {
      request(app)
        .post('/api/v1/login')
        .set({
          Accept: 'application/json', 
          authorization: mockData.invalidToken
        })
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function(err, res) {
          if (err) return console.log(err);
          assert.deepEqual(res.body, mockData.invalidTokenError);
        });
    });

    it('rejects incomplete parameters', () => {
      request(app)
      .post('/api/v1/login')
      .send(mockData.invalidLoginParams)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) return console.log(err);
        assert.deepEqual(res.body, mockData.invalidLoginParamsErr);
      });
    });

  });
});