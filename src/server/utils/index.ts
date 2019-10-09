function checkSignupParams(params: Object): Boolean | object {
  const requiredParams = [
    'player_name',
    'email',
    'password',
    'secret_one',
    'secret_two'
  ];
  const missingParams = [];
  
  for (let param of requiredParams) {
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