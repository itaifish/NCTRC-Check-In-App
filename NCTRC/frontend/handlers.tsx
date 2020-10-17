import { useColorScheme } from "react-native";
import * as config from "./config/config.json";
import { components } from "./domain/domain";

// FUNCTIONS TO HANDLE COMMUNICATION WITH THE BACKEND

// check if user exists
export const checkUserExists = async (
  userRequestModel: components["schemas"]["UserRequestModel"]
): Promise<any> => {
  const response = await fetch(`${config.base_url}/api/user/exists`, {
    method: "POST",
    body: JSON.stringify({
      firstName: userRequestModel["firstName"],
      lastName: userRequestModel["lastName"],
      email: userRequestModel["email"],
    }),
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
    body: JSON.stringify({
      user: newUserRequestModel["user"],
      signinData: newUserRequestModel["signinData"],
      signature: newUserRequestModel["signature"],
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.status;
};

// sign in returning user
export const signinUser = async (
  signinRequestModel: components["schemas"]["SigninRequestModel"]
): Promise<number> => {
  const response = await fetch(`${config.base_url}/api/user/signin`, {
    method: "POST",
    body: JSON.stringify({
      user: signinRequestModel["user"],
      signinData: signinRequestModel["signinData"],
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.status;
};

// sign out user
export const signoutUser = async (
  userRequestModel: components["schemas"]["UserRequestModel"]
): Promise<number> => {
  const response = await fetch(`${config.base_url}/api/user/signout`, {
    method: "POST",
    body: JSON.stringify({
      firstName: userRequestModel["firstName"],
      lastName: userRequestModel["lastName"],
      email: userRequestModel["email"],
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.status;
};

// post to user check-in data collection

// update user check-in data object with checkout time

// update farm max capactiy
