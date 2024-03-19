import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import LoyaltyAuthLoginOutput from "./classes/LoyaltyAuthLoginOutput"
import LoyaltyAuthLoginError, { LoyaltyAuthLoginErrorCode } from "./classes/LoyaltyAuthLoginError";

class LoyaltyAuth {
  private _accessKeyId: string = "";
  private _client: CognitoIdentityProviderClient | null = null;

  public static client(accessKeyId: string, region: string): LoyaltyAuth {
    let _ = new LoyaltyAuth()
    _._accessKeyId = accessKeyId;
    _._client = new CognitoIdentityProviderClient({
      region: region
    });
    return _;
  }

  /**
   * Funzione per eseguire la login
   * 
   * @param username - Username dell'utente
   * @param password - Password dell'utente
   * @returns Promise che si risolve con il risultato dell'autenticazione
   */
  public async login(
    username: string,
    password: string,
  ): Promise<LoyaltyAuthLoginOutput> {
    const params: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this._accessKeyId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };

    try {
      const command = new InitiateAuthCommand(params);
      const response = await this._client!.send(command);

      const { AuthenticationResult } = response;
      if (AuthenticationResult) {
        const { AccessToken, IdToken, RefreshToken } = AuthenticationResult;
        return new LoyaltyAuthLoginOutput(AccessToken!, IdToken!, RefreshToken);
      } else {
        throw new LoyaltyAuthLoginError(`Authentication result is missing: ${response?.ChallengeName || ""}`, LoyaltyAuthLoginErrorCode.AuthResultMissing);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new LoyaltyAuthLoginError(error.message, LoyaltyAuthLoginErrorCode.AuthResultError);
      } else {
        throw new LoyaltyAuthLoginError("Unknown error occurred during login");
      }
    }
  }
}


export default LoyaltyAuth;
