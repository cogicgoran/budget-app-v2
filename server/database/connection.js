// get the client
const mysql = require('mysql2');

// create the connection to database
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'budget_app_test',
  password:"root"
});

module.exports = {
  dbConn
};