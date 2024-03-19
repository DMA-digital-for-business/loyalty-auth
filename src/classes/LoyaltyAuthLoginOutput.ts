class LoyaltyAuthLoginOutput {
    accessToken: string;
    idToken: string;
    refreshToken?: string;
    
    constructor(accessToken: string, idToken: string, refreshToken?: string) {
      this.accessToken = accessToken;
      this.idToken = idToken;
      this.refreshToken = refreshToken;
    }

  }
  
  export default LoyaltyAuthLoginOutput;