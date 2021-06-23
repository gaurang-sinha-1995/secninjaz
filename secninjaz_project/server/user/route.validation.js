const Joi = require('joi');

module.exports = {
    user: {
        registerUser: {
            body: {
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            }
        },
        login: {
            body: {
                email: Joi.string().required(),
                password: Joi.string().required(),
            }
        },
        placeOrder: {
            body: {
                item_name: Joi.string().required(),
                item_price: Joi.string().required(),
            }
        }
    }
}