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

// sign in user

// post signature

// post to user check-in data collection

// update user check-in data object with checkout time

// update farm max capactiy
