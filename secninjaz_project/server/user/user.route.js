const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const userCtrl = require('./user.controller');
const paramValidation = require('./route.validation');
const Utility = require('../../modules/utility');
const middleware = require('../../middleware/auth');



router.route('/registerUser').post(validate(paramValidation.user.registerUser) , userCtrl.registerUser);
router.route('/login').post(validate(paramValidation.user.login) , userCtrl.login);
router.route('/placeOrder').post(validate(paramValidation.user.placeOrder), middleware.authenticateToken, userCtrl.placeOrder);
router.route('/getOrder').get(middleware.authenticateToken, userCtrl.getOrder);


router.use((err, _req, res, _next) => {
    let responseData = Utility.handleResponse(400, "Validation Error");
    if (err) {
        responseData['meta']['data'] = {
            "error": err.errors[0]['messages'],
        };
        return res.status(responseData.meta.code).json(responseData);
    }
})

module.exports = router;