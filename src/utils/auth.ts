import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import { COGNITO_REGION, CLIENT_ID } from "./cognito-amplify-config";

const cognitoClient = new CognitoIdentityProviderClient({ region: COGNITO_REGION });

export const authenticateUser =  async (username: string, password: string) => {
    const params: InitiateAuthCommandInput = {
        AuthFlow:"USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);


    if (response.AuthenticationResult) {
      console.log("Authentication looks  successful: ", response.AuthenticationResult);

      return response.AuthenticationResult; 
    } else {
      console.log("Authentication failed");
      return null;
    }
  } catch (error) {
    console.error("Error:-", error);
    throw error;
  }
}
