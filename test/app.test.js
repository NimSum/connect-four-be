const app = require('../dist/src/app');
const request = require('supertest');
const mockData = require('./mockData');
const { assert, expect } = require('chai');

describe('App', () => {
  after(() => {
    app.close();
  });

  describe('POST /signup', () => {
    it('responds with newly created player', async () => {
      request(app)
        .post('/api/v1/signup')
        .send(mockData.newPlayer)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return console.log(err);
          assert.deepEqual(Object.keys(res.body), Object.keys(mockData.createdPlayer));
        });
    });
    
    it('responds with missing params', async () => {
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

    it('has proper error handling', async () => {
      
    });
  });

});