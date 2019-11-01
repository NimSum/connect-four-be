export{};

const db = require('../../db');
const { compareEncryptedText } = require('../../utils/passwordEncryptions')
const { verifyToken } = require('../../utils/jwtAuthentication');

async function loginAuthentication(req: any, res: any, next: any) {
  let playerFound: any;

  try {
    if (!!req.headers.authorization) {
      const verified =  await verifyToken(req.headers.authorization);
      const id: string = verified._id;
      const found = await db.getPlayerById(id);
      playerFound = found[0];
    } else {
      const email: string = req.body.email;
      playerFound = await db.getPlayer(true, email)
    }

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
