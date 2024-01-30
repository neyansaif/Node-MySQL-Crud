const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1122',
  database: 'employeeDB',
})

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack)
  } else {
    console.log('connected as id ' + connection.threadId)
  }
})

module.exports = connection
