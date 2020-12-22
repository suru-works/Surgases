const mysql = require('mysql2');

module.exports.pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports.buildQuery = (table, params, cols) => {
    let conditions = [];
    let values = [];

    for (let key in params) {
        conditions.push(key + ' = ? ');
        values.push(params[key]);
    }
    
    if (conditions.length > 0) {
        return {
            query: 'SELECT ' + cols.join(' , ') + ' FROM ' + table + ' WHERE ' + conditions.join(' AND '),
            values: values
        };
    } else {
        return {
            query: 'SELECT ' + cols.join(' , ') + ' FROM ' + table
        };
    }
}