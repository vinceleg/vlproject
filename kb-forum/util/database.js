const mysql = require('mysql2');

// connect to a remotemysql
const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'UBfDXnjRcU',
    database: 'UBfDXnjRcU',
    password: 'ZpbIA3wHIV',
});

module.exports = pool.promise();