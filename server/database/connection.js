// get the client
const mysql = require('mysql2');

// create the connection to database
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '8081',
  database: 'budget_app_test',
  password:"example"
});

module.exports = {
  dbConn
};