const bl = require('./user.bl');
const Utility = require('../../modules/utility');

let db;
let responseData;
async function registerUser(req, res) {
    try {
        db = req.app.get('db');
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const user_obj = {
            first_name,
            last_name,
            email,
            password,
        };
        await bl.registerUser(db.postgres, user_obj);
        responseData = Utility.handleResponse(200, "SUCCESS");
        responseData['meta']['data'] = {
            "error": null,
            "status": 'successful',
        };
        res.status(responseData.meta.code).json(responseData);
    } catch (err) {
        console.log(err);
        responseData = Utility.handleResponse(400, "Failed");
        responseData['meta']['data'] = {
            "status": "unsuccessful",
            "error": err.message,
        };
        res.status(responseData.meta.code).json(responseData);
    }
}

async function login(req, res) {
    try {
        db = req.app.get('db');
        const email = req.body.email;
        const password = req.body.password;
        const token = await bl.login(db.postgres, email, password);
        responseData = Utility.handleResponse(200, "SUCCESS");
        responseData['meta']['data'] = {
            "error": null,
            "status": 'successful',
            "token": token
        };
        res.status(responseData.meta.code).json(responseData);
    } catch (err) {
        console.log(err);
        responseData = Utility.handleResponse(400, "Failed");
        responseData['meta']['data'] = {
            "status": "unsuccessful",
            "error": err.message,
            "token": null
        };
        res.status(responseData.meta.code).json(responseData);
    }
}


async function placeOrder(req, res) {
    try {
        db = req.app.get('db');
        const item_name = req.body.item_name;
        const item_price = req.body.item_price;
        const item_count = req.body.item_count;
        const user_id = req.user.user_id;
        await bl.placeOrder(db.postgres, item_name, item_price, item_count, user_id);
        responseData = Utility.handleResponse(200, "SUCCESS");
        responseData['meta']['data'] = {
            "error": null,
            "status": 'successful',
        };
        res.status(responseData.meta.code).json(responseData);
    } catch (err) {
        console.log(err);
        responseData = Utility.handleResponse(400, "Failed");
        responseData['meta']['data'] = {
            "status": "unsuccessful",
            "error": err.message,
        };
        res.status(responseData.meta.code).json(responseData);
    }
}

async function getOrder(req, res) {
    try {
        db = req.app.get('db');
        const user_id = req.user.user_id;
        const sort_order = req.query.sort_order;
        const page = req.query.page;
        const limit = req.query.limit;
        const obj = {
            user_id,
            sort_order,
            page,
            limit,
        }
        const order_details = await bl.getOrderDetails(db.postgres, obj);
        responseData = Utility.handleResponse(200, "SUCCESS");
        responseData['meta']['data'] = {
            "error": null,
            "order_details": order_details.order_details,
            "total_order": order_details.total_orders
        };
        res.status(responseData.meta.code).json(responseData);
    } catch (err) {
        console.log(err);
        responseData = Utility.handleResponse(400, "Failed");
        responseData['meta']['data'] = {
            "error": err.message,
            "order_details": null
        };
        res.status(responseData.meta.code).json(responseData);
    }
}


module.exports = {
    registerUser,
    login,
    placeOrder,
    getOrder
}