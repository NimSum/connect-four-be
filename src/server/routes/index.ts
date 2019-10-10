  export{};
  
  const express = require('express');
  const router = express.Router();
  const params = require('../../utils/paramsVerification');
  const db = require('../../db');
  
  router.post('/signup', params.checkSignupParams, (req: any, res:any) => {
      db.createNewPlayer(req.body)
        .then((result: object) => res.status(201).json(result))
        .catch((error: object) => res.status(500).json(error));
  });

  router.post('/login', params.checkLoginParams, (req:any, res:any) => {
      db.getPlayer(req.body)
        .then((result: object) => res.status(200).json(result))
        .catch((error: object) => res.status(500).json(error));
  });

  module.exports = router;

