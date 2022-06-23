import { Context, FirehoseTransformationEvent } from 'aws-lambda';
import { createConnection } from 'mysql2/promise';

export const lambdaHandler = async (event: FirehoseTransformationEvent, context: Context) => {
  const connection = await createConnection({
    database: 'CalculatorApp',
    host: 'calculator-app-instance.c51brizi3czc.sa-east-1.rds.amazonaws.com',
    password: 'Leandro2))!',
    user: 'admin',
    port: 3306,
  });

  const [operations] = await connection.query({
    sql: 'select * from operations;',
  });

  connection.destroy();

  return {
    operations,
  };
};
