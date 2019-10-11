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

    });

    it('rejects invalid email', () => {
   
    });

    it('rejects invalid password', () => {
     
    });

    it('rejects invalid password', () => {
 
    });
    
    it('rejects invalid token', () => {

    });

    it('rejects incomplete parameters', () => {

    });

  });
});