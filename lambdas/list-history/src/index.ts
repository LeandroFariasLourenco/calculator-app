import { Context, FirehoseTransformationEvent } from 'aws-lambda';
import { createConnection } from 'mysql2/promise';
import { getConnection } from '@my-packages/calculator-app';

export const lambdaHandler = async (event: FirehoseTransformationEvent, context: Context) => {
  const connection = await getConnection();

  try {
    const [operations] = await connection.query({
      sql: 'select * from operations;',
    });

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
