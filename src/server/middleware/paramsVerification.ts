const requiredParams = require('../../utils/requiredParams');

function checkParams(req: any, res: any, next: any, required: Array<string>) {
  const missingParams: Array<string> = [];

  for (let param of required) {
    if (!req.body[param]) missingParams.push(param);
  };

  if (missingParams.length > 0) {
    const errorMessage = {
      params_required: required.join(', '),
      error: `Missing: ${missingParams.join(', ')}`
    }

    res.status(400).json(errorMessage);
  } else {
    next();
  }
};

module.exports = {
  checkSignupParams: (req: any, res: any, next: any) => 
    checkParams(req, res, next, requiredParams.signUp),
  checkLoginParams: (req: any, res: any, next: any) => 
    checkParams(req, res, next, requiredParams.login)
};
