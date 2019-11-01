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
      const { player_name, email } = newPlayer;
      const token = await jwt.generateToken({ player_name, email });
      res.status(201).json({ token, player: newPlayer });
    } catch(error) {
      res.status(500).json(error)
    }
  });

  router.post('/login', params.checkLoginParams, loginAuthentication, async (req:any, res:any) => {
    const { player_name, _id } = req.playerFound;
    try {
      const token = await jwt.generateToken({ player_name, _id });
      res.status(200).json({token, player: req.playerFound});
    } catch(error) {
      res.status(500).json(error)
    }
  });

  router.post('/anonymous', async (req:any, res:any) => {
    const { player_name } = req.body;
    try {
      if (!!player_name && player_name.length > 2) {
        const token = await jwt.generateToken({ player_name, player_type: 'anonymous' });
        res.status(200).json({token});
      } else {
        res.status(400).json({error: 'Name must be 3-15 characters'})
      }
    } catch(error) {
      res.status(500).json(error);
    }
  });

  module.exports = router;

