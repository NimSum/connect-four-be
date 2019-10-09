  export{};
  
  const express = require('express');
  const router = express.Router();
  const utils = require('../utils');
  const db = require('../../db')
  
  router.post('/signup', (req: any, res:any) => {
    const verifiedParams: object | boolean = utils.checkSignupParams(req.body);
    if (verifiedParams === true) {
      db.createNewPlayer(req.body)
        .then((result: object) => res.status(201).json(result))
        .catch((error: object) => res.status(500).json(error));
    } else {
      res.status(400).json(verifiedParams);
    }; 
  }); 

  module.exports = router;

