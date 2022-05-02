const mysql = require('mysql')

console.log('Selected database -> local');

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "pcmania",
    debug: true,
    dateStrings: true
});

module.exports = pool;