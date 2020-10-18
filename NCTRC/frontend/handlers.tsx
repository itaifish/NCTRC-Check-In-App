import { useColorScheme } from "react-native";
import * as auth from "./config/auth.json";
import * as config from "./config/config.json";
import { components } from "./domain/domain";
const fetch = require("node-fetch");

// FUNCTIONS TO HANDLE COMMUNICATION WITH THE BACKEND

// check if user exists
export const checkUserExists = async (
  userRequestModel: components["schemas"]["UserRequestModel"]
): Promise<any> => {
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
    return data.userExists;
  } catch (error) {
    console.log(error);
  }
};

// create and sign in new user
export const createAndSigninUser = async (
  newUserRequestModel: components["schemas"]["NewUserRequestModel"]
): Promise<number> => {
  const response = await fetch(`${config.base_url}/api/user/create`, {
    method: "POST",
    headers: { auth: auth.auth_key },
    body: JSON.stringify(newUserRequestModel),
  });
  return response.status;
};

// sign in returning user
export const signinUser = async (
  signinRequestModel: components["schemas"]["SigninRequestModel"]
): Promise<number> => {
  const response = await fetch(`${config.base_url}/api/user/signin`, {
    method: "POST",
    headers: { auth: auth.auth_key },
    body: JSON.stringify(signinRequestModel),
  });
  return response.status;
};

// sign out user
export const signoutUser = async (
  userRequestModel: components["schemas"]["UserRequestModel"]
): Promise<number> => {
  const response = await fetch(`${config.base_url}/api/user/signout`, {
    method: "POST",
    headers: { auth: auth.auth_key },
    body: JSON.stringify(userRequestModel),
  });
  return response.status;
};

// delete user
export const deleteUser = async (
  userRequestModel: components["schemas"]["UserRequestModel"]
): Promise<number> => {
  const response = await fetch(`${config.base_url}/api/user/delete`, {
    method: "DELETE",
    headers: { auth: auth.auth_key },
    body: JSON.stringify(userRequestModel),
  });
  return response.status;
};

export const updateMaxCapacity = async (
  updateMaxCapacityRequestModel: components["schemas"]["UpdateMaxCapacityRequestModel"]
): Promise<number> => {
  const response = await fetch(`${config.base_url}/api/admin/capacity`, {
    method: "POST",
    headers: { auth: auth.auth_key },
    body: JSON.stringify(updateMaxCapacityRequestModel),
  });
  return response.status;
};
