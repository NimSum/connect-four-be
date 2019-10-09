module.exports = function() {
  const express = require('express');
  const router = express.Router();
  const utils = require('../utils')();
  
  router.post('/signup', (req, res) => {
    const verifiedParams = utils.checkSignupParams(req.body);
    if (verifiedParams === true) {
      // create account
      res.status(201).json('Account Created');
    } else {
      res.status(400).json(verifiedParams);
    };
  }); 

  return router;
};

