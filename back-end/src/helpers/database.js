const mariadb = require('mariadb');

const ERROR_CODES = {
  PROTOCOL_CONNECTION_LOST: 'PROTOCOL_CONNECTION_LOST',
  ER_CON_COUNT_ERROR: 'ER_CON_COUNT_ERROR',
  ECONNREFUSED: 'ECONNREFUSED',
};

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 7,
});

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === ERROR_CODES.PROTOCOL_CONNECTION_LOST) {
      console.error('Database connection was closed.');
    }
    if (error.code === ERROR_CODES.ER_CON_COUNT_ERROR) {
      console.error('Database has too many connections.');
    }
    if (error.code === ERROR_CODES.ECONNREFUSED) {
      console.error('Database connection was refused.');
    }

    return;
  }

  connection.release();
  console.log('Connected to the database');
});

module.exports = pool;
