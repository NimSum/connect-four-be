export{};

const db = require('../../db');
const { compareEncryptedText } = require('../../utils/passwordEncryptions')
const { verifyToken } = require('../../utils/jwtAuthentication');

async function loginAuthentication(req: any, res: any, next: any) {
  let email: string;

  try {
    if (!!req.headers.authorization) {
      const verified =  await verifyToken(req.headers.authorization);
      email = verified.email;
    } else {
      email = req.body.email;
    }

    const playerFound = await db.getPlayer(true, email);

    if (!playerFound) {
      res.status(404).json({ error: 'Invalid login credentials' });
    } else {
      const passwordMatch: boolean = await compareEncryptedText(req.body.password || '', playerFound.password || '');
      if (passwordMatch || !!req.headers.authorization) {
        req.playerFound = playerFound
        next();
      }
      else {
        res.status(404).json({ error: 'Invalid login credentials' })
      };
    };
  } catch(error) { 
    res.status(500).json(error);
  };
};

module.exports = loginAuthentication;
