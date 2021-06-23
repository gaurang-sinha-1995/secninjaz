const Utility = require('../../modules/utility');


function getSortOrder(obj) {
    let sort_order_query = ' ';
    if(!!obj.sort_order) {
        sort_order_query = `order by order_id ${obj.sort_order}`
    }
    return sort_order_query;
}

module.exports = {
    getSortOrder
}