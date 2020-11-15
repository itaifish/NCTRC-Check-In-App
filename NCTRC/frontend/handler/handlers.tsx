import { useColorScheme } from "react-native";
import * as auth from "../config/auth.json";
import * as config from "../config/config.json";
import { components } from "../domain/domain";
import fetch from "node-fetch";

// FUNCTIONS TO HANDLE COMMUNICATION WITH THE BACKEND

// check if user exists
export const checkUserExists = async (
  userRequestModel: components["schemas"]["UserRequestModel"]
): Promise<boolean> => {
  const response = await fetch(`${config.base_url}/api/user/exists`, {
    method: "POST",
    headers: { auth: auth.auth_key },
    body: JSON.stringify(userRequestModel),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  try {
    const data: components["schemas"]["UserExistsResult"] = await response.json();
    return data.userExists || false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// create and sign in new user
export const createAndSigninUser = async (
  newUserRequestModel: components["schemas"]["NewUserRequestModel"] 
): Promise<components["schemas"]["Result"] | number> => {
  const url = `${config.base_url}/api/user/create`;
  const method = "POST";
  return await sendRequest(url, method,  JSON.stringify(newUserRequestModel));
};

// sign in returning user
export const signinUser = async (
  signinRequestModel: components["schemas"]["SigninRequestModel"] 
): Promise<components["schemas"]["Result"] | number> => {
  const url = `${config.base_url}/api/user/signin`;
  const method = "POST";
  return await sendRequest(url, method,  JSON.stringify(signinRequestModel));
};

// sign out user
export const signoutUser = async (
  userRequestModel: components["schemas"]["UserRequestModel"] 
): Promise<components["schemas"]["Result"] | number> => {
  const url = `${config.base_url}/api/user/signout`;
  const method = "POST";
  return await sendRequest(url, method,  JSON.stringify(userRequestModel));

};

// delete user
export const deleteUser = async (
  userRequestModel: components["schemas"]["UserRequestModel"] | number
): Promise<components["schemas"]["Result"] | number> => {
  const url = `${config.base_url}/api/user/delete`;
  const method = "DELETE";
  return await sendRequest(url, method,  JSON.stringify(userRequestModel));
};

//updateMax 
export const updateMaxCapacity = async (
  updateMaxCapacityRequestModel: components["schemas"]["UpdateMaxCapacityRequestModel"]
): Promise<components["schemas"]["Result"] | number> => {
  const url = `${config.base_url}/api/admin/capacity`;
  const method = "POST";
  return await sendRequest(url, method,  JSON.stringify(updateMaxCapacityRequestModel));
};

export const validatePin = async (
  PinValidationRequestModel: components["schemas"]["PinValidationRequestModel"]
): Promise<components["schemas"]["Result"] | number> => {
  const url = `${config.base_url}/api/admin/pinValidate`;
  const method = "POST";
  return await sendRequest(url, method,  JSON.stringify(PinValidationRequestModel));
};

const sendRequest = async (url: string, method: string, body: string) : Promise<components["schemas"]["Result"] | number> => {
  const result = await fetch(url, {
    method: method,
    headers: { auth: auth.auth_key },
    body: body,
  });
  if(result.status >= 200 && result.status < 300) {
    return result.status;
  } else {
    return await result.json();
  }
}


