export {};

const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/keys');

async function generateToken(data: object): Promise<string> {
  const config: object = {
    expiresIn: '7d'
  };

  return await jwt.sign(data, secretKey, config);
}

module.exports = {
  generateToken
};