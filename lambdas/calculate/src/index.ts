import { Context } from 'aws-lambda';
import { getConnection } from '@my-packages/calculator-app';

export const lambdaHandler = async (event: any, context: Context) => {

  const {
    operation,
    name,
  } = event;

  const equationResult = String(eval(operation));

  const connection = await getConnection();
  try {
    await connection.query(
      'insert into operations (name, equation, equation_result, created_at) values (?, ?, ?, ?)',
      [name, operation, equationResult, new Date().toLocaleDateString('pt-BR')]);

    return {
      statusCode: 200,
      equationResult,
    };
  } catch (e) {
    return {
      statusCode: 500,
      e,
    }
  } finally {
    connection.destroy();
  }
};