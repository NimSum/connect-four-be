const requiredParams = require('../../utils/requiredParams');
function checkParams(req, res, next, required) {
    const missingParams = [];
    const ifTokenLogin = req.path === '/login' && !!req.headers.authorization;
    for (let param of required) {
        if (!req.body[param])
            missingParams.push(param);
    }
    ;
    if (missingParams.length > 0 && !ifTokenLogin) {
        const errorMessage = {
            params_required: required.join(', '),
            error: `Missing: ${missingParams.join(', ')}`
        };
        res.status(400).json(errorMessage);
    }
    else {
        next();
    }
}
;
module.exports = {
    checkSignupParams: (req, res, next) => checkParams(req, res, next, requiredParams.signUp),
    checkLoginParams: (req, res, next) => checkParams(req, res, next, requiredParams.login)
};
//# sourceMappingURL=paramsVerification.js.map