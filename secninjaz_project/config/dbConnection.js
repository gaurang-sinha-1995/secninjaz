const Pool = require('pg').Pool;

module.exports = class Database {
    constructor(config) {
        this.connection = new Pool(config);
        console.log('Database Connected')
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(row);
            });
        })
    }
}