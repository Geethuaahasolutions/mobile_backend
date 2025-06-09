require('dotenv').config();
const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // will be '' (empty string) if blank in .env
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: Promisify for async/await usage
pool.query = util.promisify(pool.query);

// Log every query (for debugging)
pool.on('connection', (connection) => {
  connection.on('enqueue', (sequence) => {
    if (sequence.sql) {
      console.log(`[DB QUERY] ${sequence.sql}`);
    }
  });
});

console.log('MySQL connection pool created!');

module.exports = pool;