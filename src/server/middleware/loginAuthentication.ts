export{};

const db = require('../../db');
const { compareEncryptedText } = require('../../utils/passwordEncryptions')
const { verifyToken } = require('../../utils/jwtAuthentication');

async function loginAuthentication(req: any, res: any, next: any) {
  try {
    const { email } = await verifyToken(req.headers.authorization);
    const playerFound = await db.getPlayer(true, req.body.email || email);
    const match: Promise<boolean> = await compareEncryptedText(req.body.password, playerFound.password);

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
