  export{};
  
  const express = require('express');
  const router = express.Router();
  const params = require('../middleware/paramsVerification');
  const loginAuthentication = require('../middleware/loginAuthentication');
  const db = require('../../db');
  
  router.post('/signup', params.checkSignupParams, async (req: any, res:any) => {
    try {
      const newPlayer = await db.createNewPlayer(req.body);
      res.status(201).json(newPlayer);
    } catch(error) {
      res.status(500).json(error)
    }
  });

  router.post('/login', params.checkLoginParams, loginAuthentication, async (req:any, res:any) => {
    res.status(200).json(req.playerFound);
  });

  module.exports = router;

