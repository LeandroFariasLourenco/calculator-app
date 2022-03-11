const express = require('express');
const pool = require('../helpers/database');

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const SQL_STATEMENT = 'select * from operations order by created_at DESC;';
    const result = await pool.query(SQL_STATEMENT);

    response.status(200).json(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.post('/filter', async (request, response) => {
  try {
    const {
      id,
      username,
      result,
      date,
    } = request.body;
    const SQL_STATEMENT = `select * from operations
    where id ${id ? '=' : '>'} ?
    and name ${username ? '=' : '!='} ?
    and equation_result ${result ? '=' : '>'} ?
    and created_at ${date ? '=' : '!='} ?`;
    const queryResult = await pool.query(SQL_STATEMENT, [
      id ? `${id}` : '0',
      username ? `${username}` : '""',
      result ? `${result}` : '0',
      date ? `${date}` : '""',
    ]);
    response.status(200).json(queryResult);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
