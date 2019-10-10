  export{};
  
  const express = require('express');
  const router = express.Router();
  const params = require('../middleware/paramsVerification');
  const loginAuthentication = require('../middleware/loginAuthentication');
  const jwt = require('../../utils/jwtAuthentication');
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
    const { player_name, email } = req.playerFound;
    const token = await jwt.generateToken({ player_name, email });
    
    res.status(200).json({token, player: req.playerFound});
  });

  module.exports = router;

