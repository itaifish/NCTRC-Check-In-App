import { useColorScheme } from "react-native";
import * as config from "../../config/config.json";

// FUNCTIONS TO HANDLE COMMUNICATION WITH THE BACKEND

// check if user exists
export const checkUserExists = async (name: string, email: string) => {
  try {
    let response = await fetch(config.base_url + "/api/user/exists", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
    response.json().then((data) => {
      return data.userExists;
    });
  } catch (error) {
    console.log(error);
  }
};

// create and sign in new user
export const createAndSigninUser = async (
  name: string,
  email: string,
  signature: string,
  temperature: number,
  yesQuestion: string
) => {
  try {
    await fetch(config.base_url + "/api/user/create", {
      method: "POST",
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
        },
        signature: signature,
        signatureDate: new Date(),
        signinData: {
          yesQuestion: yesQuestion,
          temperature: temperature,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

// sign in returning user
export const signinUser = async (
  name: string,
  email: string,
  temperature: number,
  yesQuestion?: string
) => {
  try {
    await fetch(config.base_url + " /api/user/signin", {
      method: "POST",
      body: JSON.stringify({
        signinData: {
          yesQuestion: yesQuestion,
          temperature: temperature,
        },
        user: {
          name: name,
          email: email,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

// sign out user
export const signoutUser = async (name: string, email: string) => {
  try {
    await fetch(config.base_url + "/api/user/signout", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

// post to user check-in data collection

// update user check-in data object with checkout time

// update farm max capactiy
