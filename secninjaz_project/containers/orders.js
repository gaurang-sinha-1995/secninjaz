const Utility = require('../modules/utility');

module.exports = class Orders {
    static async insertOrder(database, item_name, item_price, item_count, user_id) {
        const sql = `INSERT INTO orders(user_id, item_name, item_price, item_count) VALUES (${user_id}, '${item_name}', ${item_price}, ${item_count})`;
        return database.query(sql);
    }
    static async getOrderData(database, obj, sort_order) {
        const sql = `Select * from orders where user_id = ${obj.user_id} and is_delete = false ${sort_order} limit ${obj.limit} OFFSET ${Utility.getOffset(obj.page, obj.limit)}`;
        console.log(sql, sql)
        return database.query(sql);
    }
}