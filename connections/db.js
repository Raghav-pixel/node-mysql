var mysql = require('mysql2/promise');

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'khanna',
    database: 'information'
});

pool.getConnection();

module.exports = pool;