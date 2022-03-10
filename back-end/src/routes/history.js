const express = require('express');
const pool = require('../helpers/database');
const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const SQL_STATEMENT = 'select * from operations';
    const result = await pool.query(SQL_STATEMENT);

    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(400).send(error.message);
  }
});

module.exports = router;
