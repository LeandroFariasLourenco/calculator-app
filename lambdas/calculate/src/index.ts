import AWS from 'aws-sdk';
import { Context } from 'aws-lambda';
import { createConnection } from 'mysql2/promise';

const getSecret = async (SecretId: string, region: string): Promise<{
  username: string;
  password: string;
  engine: string;
  host: string;
  port: number;
  dbname: string;
  dbInstanceIdentifier: string;
}> => {

  const secretsManager = new AWS.SecretsManager({ region });
  try {
    const secretValue = await secretsManager.getSecretValue({
      SecretId
    }).promise();

    if ('SecretString' in secretValue) {
      return JSON.parse(secretValue.SecretString!);
    } else {
      return JSON.parse(new Buffer(secretValue.SecretBinary! as string, 'base64').toString('ascii'));
    }
  } catch (e) {
    throw new Error(e as string);
  }
}

export const lambdaHandler = async (event: any, context: Context) => {

  const {
    operation,
    name,
  } = event;

  const equationResult = String(eval(operation));
  const {
    port,
    username: user,
    host,
    password,
    dbname: database,
  } = await getSecret('calculator-app-instance-secret', 'sa-east-1');

  const connection = await createConnection({
    database,
    port,
    user,
    host,
    password
  });

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