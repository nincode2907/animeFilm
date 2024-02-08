const config = require('../configs/config')
const mysql = require('mysql')


const mysqlConfig = {
  host: config.server || '',
  port: config.port || '',
  user: config.username || '',
  password: config.password || '',
  database: config.dbname || '',
  multipleStatements: true
}

var connection

// const axios = require('axios');

// const maxConnections = 5; 
// const url = 'http://localhost:8000/api/film';

// // Hàm để tạo kết nối
// function createConnection() {
//   axios.get(url)
//     .then(response => {
//       console.log(`Response status code: ${response.status}`);
//     })
//     .catch(error => {
//       console.error(`Request error: ${error.message}`);
//     });
// }

  // createConnection();
connection = mysql.createConnection(mysqlConfig)

connection.connect(mysqlConfig, (err) => {
  if(err) {
    console.log('Error connecting' + err.message);
  } else {
    console.log('Connect to mysql successfully!!')
  }
})



module.exports = connection