import * as AWS from 'aws-sdk';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

class LoyaltyAuth {
  private _client:AWS.CognitoIdentityServiceProvider|null = null;
  
  public static factory(accessKeyId:string, region:string):LoyaltyAuth{
    let _ = new LoyaltyAuth()
    _._client = new AWS.CognitoIdentityServiceProvider({
      accessKeyId: accessKeyId,
      region: region
    });
    return _;
  }

  public async login(
    username: string,
    password: string,
  ):Promise<CognitoIdentityServiceProvider.InitiateAuthResponse>{
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.AWS_ACCESS_KEY_ID!,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };
    try {
      const session = await this._client!.initiateAuth(params).promise();
      // console.log(session);
      return session;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
}


export default LoyaltyAuth;
