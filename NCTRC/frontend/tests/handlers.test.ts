import { components } from "../domain/domain";
import {
  checkUserExists,
  createAndSigninUser,
  signinUser,
  signoutUser,
  deleteUser,
  updateMaxCapacity,
} from "../handlers";

// global variables to be used as parameters to fetch calls
const newUserRequestModel: components["schemas"]["NewUserRequestModel"] = {
  user: {
    firstName: "Bob",
    lastName: "Wallace",
    email: "bob.wallace@gmail.com",
  },
  signinData: { temperature: 98 },
  signature: "Bob Wallace's signature",
};
const newUserRequestModel2: components["schemas"]["NewUserRequestModel"] = {
  user: {
    firstName: "George",
    lastName: "Walter",
    email: "george.walter@gmail.com",
  },
  signinData: { temperature: 99 },
  signature: "George Walter's signature",
};
const userRequestModel: components["schemas"]["UserRequestModel"] = {
  firstName: "Bob",
  lastName: "Wallace",
  email: "bob.wallace@gmail.com",
};
const userRequestModel2: components["schemas"]["UserRequestModel"] = {
  firstName: "George",
  lastName: "Walter",
  email: "george.walter@gmail.com",
};
const signinRequestModel: components["schemas"]["SigninRequestModel"] = {
  user: userRequestModel,
  signinData: { temperature: 98 },
};
const rejectTempNewUserRequestModel: components["schemas"]["NewUserRequestModel"] = {
  user: {
    firstName: "Bob",
    lastName: "Wallace",
    email: "bob.wallace@gmail.com",
  },
  signinData: { temperature: 102 },
  signature: "Bob Wallace's signature",
};
const rejectCovidNewUserRequestModel: components["schemas"]["NewUserRequestModel"] = {
  user: {
    firstName: "Bob",
    lastName: "Wallace",
    email: "bob.wallace@gmail.com",
  },
  signinData: { temperature: 98, yesQuestion: "Do you have COVID?" },
  signature: "Bob Wallace's signature",
};
const rejectTempSigninRequestModel: components["schemas"]["SigninRequestModel"] = {
  user: userRequestModel,
  signinData: { temperature: 102 },
};
const rejectCovidsigninRequestModel: components["schemas"]["SigninRequestModel"] = {
  user: userRequestModel,
  signinData: { temperature: 98, yesQuestion: "Do you have COVID?" },
};
const updateMaxCapacityRequestModel1: components["schemas"]["UpdateMaxCapacityRequestModel"] = {
  maxCapacity: 1,
};
const updateMaxCapacityRequestModel11: components["schemas"]["UpdateMaxCapacityRequestModel"] = {
  maxCapacity: 11,
};
const rejectUpdateMaxCapacityRequestModel: components["schemas"]["UpdateMaxCapacityRequestModel"] = {
  maxCapacity: -11,
};

test("Check for a nonexistent user", async () => {
  await deleteUser(userRequestModel);
  expect(await checkUserExists(userRequestModel)).toBe(false);
});

test("Delete a nonexistent user", async () => {
  expect(await deleteUser(userRequestModel)).toBe(405);
});

test("Create and sign in a user, check if they exist, and delete that user", async () => {
  await deleteUser(userRequestModel);
  expect(await checkUserExists(userRequestModel)).toBe(false);
  expect(await createAndSigninUser(newUserRequestModel)).toBe(201);
  expect(await checkUserExists(userRequestModel)).toBe(true);
  expect(await deleteUser(userRequestModel)).toBe(200);
  expect(await checkUserExists(userRequestModel)).toBe(false);
});

test("Create and sign in a user, sign them out, check if they exist, and delete that user", async () => {
  await deleteUser(userRequestModel);
  expect(await checkUserExists(userRequestModel)).toBe(false);
  expect(await createAndSigninUser(newUserRequestModel)).toBe(201);
  expect(await checkUserExists(userRequestModel)).toBe(true);
  expect(await signoutUser(userRequestModel)).toBe(200);
  expect(await checkUserExists(userRequestModel)).toBe(true);
  expect(await deleteUser(userRequestModel)).toBe(200);
  expect(await checkUserExists(userRequestModel)).toBe(false);
});

test("Sign in and sign out already existing user", async () => {
  await createAndSigninUser(newUserRequestModel);
  await signoutUser(userRequestModel);
  expect(await signinUser(signinRequestModel)).toBe(200);
  expect(await signoutUser(userRequestModel)).toBe(200);
  expect(await deleteUser(userRequestModel)).toBe(200);
  expect(await checkUserExists(userRequestModel)).toBe(false);
});

test("Create a user to be rejected via fever/COVID question", async () => {
  await updateMaxCapacity(updateMaxCapacityRequestModel11);
  expect(await createAndSigninUser(rejectTempNewUserRequestModel)).toBe(405);
  expect(await checkUserExists(userRequestModel)).toBe(true);
  expect(await deleteUser(userRequestModel)).toBe(200);
  expect(await checkUserExists(userRequestModel)).toBe(false);
  expect(await createAndSigninUser(rejectCovidNewUserRequestModel)).toBe(405);
  expect(await checkUserExists(userRequestModel)).toBe(true);
  expect(await deleteUser(userRequestModel)).toBe(200);
  expect(await checkUserExists(userRequestModel)).toBe(false);
});

test("Update max capacity to valid number and invalid numbers", async () => {
  expect(await updateMaxCapacity(updateMaxCapacityRequestModel1)).toBe(200);
  expect(await updateMaxCapacity(rejectUpdateMaxCapacityRequestModel)).toBe(
    400
  );
  expect(await updateMaxCapacity(updateMaxCapacityRequestModel11)).toBe(200);
});
