import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import { COGNITO_REGION, CLIENT_ID, CLIENT_SECRET } from "./cognito-amplify-config";
import CryptoJS from 'crypto-js';

const cognitoClient = new CognitoIdentityProviderClient({ region: COGNITO_REGION });

export const authenticateUser =  async (username: string, password: string)  => {

    const secretHash = await generateSecretHash(username);

    const params: InitiateAuthCommandInput = {
        AuthFlow:"USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
         
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH : secretHash
        },
      };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);


    if (response.AuthenticationResult) {
      return 200; 
    } else {
      return 500
    }
  } catch (error ) {
    if (error instanceof Error && error.name === 'NotAuthorizedException') {
        return 401
    } else{
        return 500
    }
  }
}


export const generateSecretHash = (username: string): string => {
    const message = `${username}${CLIENT_ID}`;
    
    const hash = CryptoJS.HmacSHA256(message, CLIENT_SECRET);
    
    return CryptoJS.enc.Base64.stringify(hash);

};