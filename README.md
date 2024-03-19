# My Cognito Package

This package is useful for authenticating the user to [Loyaltyone](https://loyaltyone.io) as a user (not valid for admin users)

## Installation

To install the package, run the following command in your project directory:

```bash
npm i loyalty-auth
```

## Configuration

Before using the methods, you need to configure your Loyalty credentials and the Loyalty User Pool details. This package assumes you have the following variables set:

**CLIENT_ID**: Your Loyalty Access Key ID.

**REGION**: The region your Loyalty User Pool is located in.



```jsx
import LoyaltyAuth from "loyalty-auth";

async function loginUser() {
  try {
    const client = LoyaltyAuth.client("<CLIENT_ID>","<REGION>");
    const session:LoyaltyAuthLoginOutput = await client.login("<EMAIL_ADDRESS>","<PASSWORD>");
    // Use the session information as needed
  } catch (error) {
    console.error(error);
  }
}

loginUser();

```