const Utility = require('../modules/utility');

module.exports = class User {
    static async registerUserDetails(database, obj) {
        const sql = `INSERT INTO users(email, password, first_name, last_name) VALUES ('${obj.email}', '${obj.password}', '${obj.first_name}', '${obj.last_name}')`;
        return database.query(sql);
    }
    static async getLoginStatus(database, email, password) {
        const sql = `Select user_id from users  where email = '${email}' and password = '${password}'`;
        return database.query(sql);
    }
}