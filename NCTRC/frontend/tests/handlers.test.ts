import { components } from "../domain/domain";
import {
  checkUserExists,
  createAndSigninUser,
  signinUser,
  signoutUser,
  deleteUser,
  updateMaxCapacity,
} from "../handler/handlers";

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
const rejectCovidUserRequestModel: components["schemas"]["UserRequestModel"] = {
  firstName: "Bob",
  lastName: "Wallace",
  email: "bob.wallace@gmail.com",
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
const updateMaxCapacityRequestModel1: components["schemas"]["UpdateMaxCapacityRequestModel"] = {
  maxCapacity: 1,
};
const updateMaxCapacityRequestModel111: components["schemas"]["UpdateMaxCapacityRequestModel"] = {
  maxCapacity: 111,
};
const rejectUpdateMaxCapacityRequestModel: components["schemas"]["UpdateMaxCapacityRequestModel"] = {
  maxCapacity: -11,
};

test("Check for a nonexistent user", async () => {
  await deleteUser(userRequestModel);
  expect(await checkUserExists(userRequestModel)).toBe(false);
});

test("Delete a nonexistent user", async () => {
  deleteUser(userRequestModel)
    .then((result: any) => {
      expect(result.statusCode).toBe(405);
    })
    .catch((err: any) => {
      console.error(err);
      fail();
    });
});

test("Create and sign in a user, check if they exist, and delete that user", async () => {
  await deleteUser(userRequestModel);
  expect(await checkUserExists(userRequestModel)).toBe(false);
  expect(await createAndSigninUser(newUserRequestModel)).toBe(201);
  expect(await checkUserExists(userRequestModel)).toBe(true);
  expect(await signoutUser(userRequestModel)).toBe(200);
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
  await updateMaxCapacity(updateMaxCapacityRequestModel111);
  createAndSigninUser(rejectTempNewUserRequestModel)
    .then((result: any) => {
      expect(result.statusCode).toBe(412);
    })
    .catch((err: any) => {
      console.error(err);
      fail();
    });
  expect(await checkUserExists(userRequestModel)).toBe(true);
  expect(await deleteUser(userRequestModel)).toBe(200);
  expect(await checkUserExists(userRequestModel)).toBe(false);
  createAndSigninUser(rejectCovidNewUserRequestModel)
    .then((result: any) => {
      expect(result.statusCode).toBe(412);
    })
    .catch((err: any) => {
      console.error(err);
      fail();
    });
  expect(await checkUserExists(rejectCovidUserRequestModel)).toBe(true);
  expect(await deleteUser(rejectCovidUserRequestModel)).toBe(200);
  expect(await checkUserExists(rejectCovidUserRequestModel)).toBe(false);
});

test("Update max capacity to valid number and invalid numbers", async () => {
  expect(await updateMaxCapacity(updateMaxCapacityRequestModel1)).toBe(200);
  updateMaxCapacity(rejectUpdateMaxCapacityRequestModel)
    .then((result: any) => {
      expect(result.statusCode).toBe(400);
    })
    .catch((err: any) => {
      console.error(err);
      fail();
    });
  expect(await updateMaxCapacity(updateMaxCapacityRequestModel111)).toBe(200);
});
