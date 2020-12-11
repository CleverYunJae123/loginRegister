const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '1234',
    database: 'cafesch'
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
