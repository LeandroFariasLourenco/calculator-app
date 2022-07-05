import AWS from 'aws-sdk';
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

export const getConnection = async () => {
  const {
    port,
    username: user,
    host,
    password,
    dbname: database,
  } = await getSecret('calculator-app-instance-secret', 'sa-east-1');

  return await createConnection({
    database,
    port,
    user,
    host,
    password
  });
};
