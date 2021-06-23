const Orders = require('../../containers/orders');
const User = require('../../containers/user');
const Utility = require('../../modules/utility');
const filterHandling = require('./user.filterhandling');
const config = require('../../config/config');


async function registerUser(database, obj) {
    try {
        await User.registerUserDetails(database, obj);
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function login(database, email, password) {
    try {
        let access_token = null;
        let is_login = await User.getLoginStatus(database, email, password);
        if(is_login.rows.length) {
            const user_details = is_login.rows[0];
            access_token = Utility.generateAccessToken(user_details, config.auth_access_token, config.token_expiration_in_days);
        } else {
            throw new Error ("incorrect email or password");
        }
        return access_token;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
function getFinalUserData(user_data) {
    const final_user_data = user_data.map((obj)=>{
        delete obj.password;
        return obj;
    });
    return final_user_data;
}

async function placeOrder(database, item_name, item_price, item_count, user_id) {
    try {
        await Orders.insertOrder(database, item_name, item_price, item_count, user_id);
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function getOrderDetails(database, obj) {
    try {
        let order_details = null;
        let total_orders = 0;
        const sort_order = filterHandling.getSortOrder(obj);
        const order_data = await Orders.getOrderData(database, obj, sort_order);
        if(order_data.rows.length) {
            order_details = order_data.rows;
            total_orders = order_data.rows.length;
        }
        return { order_details, total_orders };
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

module.exports = {
    registerUser,
    login,
    placeOrder,
    getOrderDetails
}