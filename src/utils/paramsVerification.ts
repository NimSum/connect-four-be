const requiredParams = require('./requiredParams');

function checkSignupParams(params: Object): Boolean | string | Boolean {
  const missingParams = checkParams(params, requiredParams.signUp);

  return missingParams;
};

function checkParams(params: Object, required: Array<string>): string | Boolean {
  const missingParams: Array<string> = [];

  for (let param of required) {
    if (!params[param]) missingParams.push(param);
  };

  return missingParams.length > 0
    ? missingParams.join(', ')
    : true;
};

module.exports = {
  checkSignupParams
};