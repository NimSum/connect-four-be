const requiredParams = require('./requiredParams');

function checkParams(params: Object, required: Array<string>): Boolean | object {
  const missingParams: Array<string> = [];

  for (let param of required) {
    if (!params[param]) missingParams.push(param);
  };

  return missingParams.length > 0
    ? {
      params_required: required.join(', '),
      error: `Missing: ${missingParams.join(', ')}`
    }
    : true;
};

module.exports = {
  checkSignupParams: (params: Object):Boolean | Object => checkParams(params, requiredParams.signUp),
  checkLoginParams: (params: Object):Boolean | Object => checkParams(params, requiredParams.login)
};