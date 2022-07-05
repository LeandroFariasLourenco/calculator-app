import { getConnection } from '@my-packages/calculator-app';
import AWS from 'aws-sdk';

export const lambdaHandler = async (event: any) => {
  const connection = await getConnection();

  try {
    const {
      id,
      username,
      result,
      date,
    } = event;

    const query = `select * from operations
    where id ${id ? '=' : '>'} ?
    and name ${username ? '=' : '!='} ?
    and equation_result ${result ? '=' : '>'} ?
    and created_at ${date ? '=' : '!='} ?`;
    const queryParams = [
      id ? `${id}` : '0',
      username ? `${username}` : '""',
      result ? `${result}` : '0',
      date ? `${date}` : '""',
    ];

    const [operations] = await connection.query(
      query,
      queryParams
    );

    return operations;
  } catch (e) {
    return {
      statusCode: 500,
      e,
    }
  } finally {
    connection.destroy();
  }
};
