  export{};
  
  const express = require('express');
  const router = express.Router();
  const params = require('../../utils/paramsVerification');
  const db = require('../../db');
  
  router.post('/signup', params.checkSignupParams, async (req: any, res:any) => {
    try {
      const newPlayer = await db.createNewPlayer(req.body);
      res.status(201).json(newPlayer);
    } catch(error) {
      res.status(500).json(error)
    }
  });

  router.post('/login', params.checkLoginParams, async (req:any, res:any) => {
      try {
        const playerFound = await db.getPlayer(req.body);
        res.status(200).json(playerFound)
      } catch(error){
        res.status(500).json(error);
      }
  });

  module.exports = router;

