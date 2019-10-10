export{};

const db = require('../../db');
const { compareEncryptedText } = require('../../utils/passwordEncryptions')

async function loginAuthentication(req: any, res: any, next: any) {
  try {
    const playerFound = await db.getPlayer(true, req.body.email);
    const { password } = playerFound;
    const match: Promise<boolean> = await compareEncryptedText(req.body.password, password);

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
