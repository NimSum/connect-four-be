export{};

const db = require('../../db');
const { compareEncryptedText } = require('../../utils/passwordEncryptions')

async function loginAuthentication(req, res, next) {
  try {
    const playerFound = await db.getPlayer(req.body);
    const { password } = playerFound;
    const match = await compareEncryptedText(req.body.password, password);

    if (playerFound === null || !match) {
      res.status(404).json({ 
        error: 'Invalid login credentials' 
      });
    } else {
      req.playerFound = playerFound;
      next();
    };
  } catch(error) { 
    res.status(500).json(error);
  };
};

module.exports = loginAuthentication;