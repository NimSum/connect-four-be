const requiredParams = require('./requiredParams');
function checkSignupParams(params) {
    const missingParams = [];
    for (let param of requiredParams.signUp) {
        if (!params[param])
            missingParams.push(param);
    }
    ;
    return missingParams.length > 0
        ? {
            error: 'Missing required params',
            missing: missingParams.join(', ')
        }
        : true;
}
;
module.exports = {
    checkSignupParams
};
//# sourceMappingURL=paramsVerification.js.map