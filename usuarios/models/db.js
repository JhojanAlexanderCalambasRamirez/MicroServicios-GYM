const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '192.168.100.2',
  user: 'root',
  password: 'password',
  database: 'usuariosms'
});

module.exports = pool;
