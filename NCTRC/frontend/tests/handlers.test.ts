import { components } from "../domain/domain";
import {
  checkUserExists,
  createAndSigninUser,
  signinUser,
  signoutUser,
} from "../handlers";

test("Basic", () => {
  expect(!true).toBe(false);
});
