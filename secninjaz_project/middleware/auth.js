const config = require('../config/config');
const jwt = require('jsonwebtoken');
const Utility = require('../modules/utility');


function authenticateToken(req, res, next) {
    let responseData = {};
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        responseData = Utility.handleResponse(401, "UNAUTHORISED");
        responseData['meta']['data'] = { 
            "error": "token_not_available",
        };
        return res.status(responseData.meta.code).json(responseData);
    }
    jwt.verify(token, config.auth_access_token, (err, user) => {
        console.log(err);
        if (err) {
            responseData = Utility.handleResponse(401, "UNAUTHORISED");
            responseData['meta']['data'] = { 
                "error": "token_expired", 
            };
            return res.status(responseData.meta.code).json(responseData);
        }
        req.user = user;
        next();
    })
}

module.exports = {
    authenticateToken
}
