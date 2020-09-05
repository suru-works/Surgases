const mysql = require('mysql2');

module.exports.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'gases2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports.buildQuery = (table, params) => {
    let conditions = [];
    let values = [];

    for (let key in params) {
        conditions.push(key + ' = ? ');
        values.push(params[key]);
    }
    
    if (conditions.length > 0) {
        return {
            query: 'SELECT * FROM ' + table + ' WHERE ' + conditions.join(' AND '),
            values: values
        };
    } else {
        return {
            query: 'SELECT * FROM ' + table
        };
    }
}