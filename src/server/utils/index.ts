const requiredParams = require('./requiredParams');

function checkSignupParams(params: Object): Boolean | object {
  const missingParams: Array<string> = [];
  
  for (let param of requiredParams.signUp) {
    if (!params[param]) missingParams.push(param);
  };

  return missingParams.length > 0
    ? {
        error: 'Missing required params',
        missing: missingParams.join(', ')
      }
    : true;
};

module.exports = {
  checkSignupParams
};