const server = require('../dist/src/app');
const request = require('supertest');

describe('app', () => {
  after(() => {
    server.close();
  });

  describe('/signup', () => {

  });

});