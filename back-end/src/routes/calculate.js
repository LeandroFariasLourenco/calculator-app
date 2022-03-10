const pool = require('../helpers/database');
const router = require('./history');

router.post('/', async (request, response) => {
  try {
    const {
      operation,
      name,
    } = request.body;
    const equationResult = String(eval(operation));

    const SQL_STATEMENT = 'insert into operations (name, equation, equation_result, created_at) values (?, ?, ?, ?)';
    await pool.query(SQL_STATEMENT, [
      name,
      operation,
      equationResult,
      new Date(),
    ]);
    response.status(200).json({
      equationResult,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send(error.message);
  }
});

module.exports = router;
