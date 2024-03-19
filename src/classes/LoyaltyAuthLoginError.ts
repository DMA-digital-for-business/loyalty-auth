class LoyaltyAuthLoginError extends Error {
  code: string;

  constructor(message: string, code: string = 'GenericError') {
    super(message);
    this.name = "LoyaltyAuthLoginError";
    this.code = code;
  }
}

enum LoyaltyAuthLoginErrorCode {
  AuthResultMissing = "AuthResultMissing",
  AuthResultError = "AuthResultError"
}
export default LoyaltyAuthLoginError;
export {LoyaltyAuthLoginErrorCode};