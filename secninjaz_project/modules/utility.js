const jwt = require('jsonwebtoken');


module.exports = class Utility {
    static handleResponse(code, message) {
        let responseData;
        if (code == 200) {
            responseData = {
                meta: {
                    code: code,
                    success: true,
                    message: message,
                },
            };
        } else {
            responseData = {
                meta: {
                    code: code,
                    success: false,
                    message: message,
                },
            };
        }
        return responseData;
    }

    static generateAccessToken(user, token, expiration_time) {
        const userRec = Object.assign({}, user);
        return jwt.sign(userRec, token, { expiresIn: expiration_time })
    }

    static getOffset(page_no, page_length) {
        let offset;
        if (page_no > 1) {
            offset = (page_no - 1) * page_length;
        } else if (page_no == 1) {
            offset = 0;
        }
        return offset;
    }
}