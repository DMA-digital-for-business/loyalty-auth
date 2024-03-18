import * as AWS from 'aws-sdk';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const client = new CognitoIdentityServiceProvider();

const login = async (
  username: string,
  password: string,
  UserPoolId: string,
  ClientId: string
): Promise<CognitoIdentityServiceProvider.InitiateAuthResponse> => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const session = await client.initiateAuth(params).promise();
    console.log(session);
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const freshToken = async (
  refreshToken: string,
  UserPoolId: string,
  ClientId: string
): Promise<CognitoIdentityServiceProvider.InitiateAuthResponse> => {
  const params = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };

  try {
    const refreshedSession = await client.initiateAuth(params).promise();
    console.log(refreshedSession);
    return refreshedSession;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login, freshToken };
