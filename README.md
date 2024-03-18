# My Cognito Package

This package is useful for authenticating the user to [Loyaltyone](https://loyaltyone.io) as a user (not valid for admin users)

## Installation

To install the package, run the following command in your project directory:

```bash
npm i loyalty-auth
```

## Configuration

Before using the methods, you need to configure your AWS credentials and the Cognito User Pool details. This package assumes you have the following environment variables set:

**AWS_ACCESS_KEY_ID**: Your AWS Access Key ID.

**AWS_REGION**: The region your AWS Cognito User Pool is located in.

You can use the dotenv package to load these variables from a .env file for development purposes.


```jsx
const { login } = require('loyalty-auth');

async function loginUser() {
  try {
    const session = await login('username', 'password');
    console.log(session);
    // Use the session information as needed
  } catch (error) {
    console.error(error);
  }
}

loginUser();

```