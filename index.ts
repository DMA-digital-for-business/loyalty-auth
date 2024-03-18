import * as AWS from 'aws-sdk';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const client = new CognitoIdentityServiceProvider();

const login = async (
  username: string,
  password: string,
): Promise<CognitoIdentityServiceProvider.InitiateAuthResponse> => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.AWS_ACCESS_KEY_ID!,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const session = await client.initiateAuth(params).promise();
    // console.log(session);
    return session;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};


export { login };
