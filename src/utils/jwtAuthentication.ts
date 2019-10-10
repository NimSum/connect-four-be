export {};

const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/keys');

async function generateToken(data: object): Promise<string> {
  const config: object = {
    expiresIn: '7d'
  };

  return await jwt.sign(data, secretKey, config);
}

async function verifyToken(token: string): Promise<object | boolean> {
  if (!token) return false;
  const splitBearer = token.split(' ');
  return await jwt.verify(splitBearer[1], secretKey);
};

module.exports = {
  generateToken,
  verifyToken
};