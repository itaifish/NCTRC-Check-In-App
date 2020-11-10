package org.nctrc.backend.managers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.config.DatabaseConstants;
import org.nctrc.backend.model.internal.SigninEmailIdPair;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninDataRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.model.response.UserExistsResult;
import org.nctrc.backend.utility.Utility;

public class UserManagerTest {

  static final DatabaseManagerInterface databaseManager =
      new DatabaseManagerInterface() {
        @Override
        public void addUser(NewUserRequestModel userRequestModel) {}

        @Override
        public SigninEmailIdPair signinUser(SigninRequestModel signinRequestModel)
            throws InterruptedException {
          return new SigninEmailIdPair(
              UUID.randomUUID().toString(), signinRequestModel.getUser().getEmail());
        }

        @Override
        public void signOutUser(SigninEmailIdPair signinEmailIdPair) throws InterruptedException {}

        @Override
        public void signOutUser(SigninEmailIdPair signinEmailIdPair, String signoutTime)
            throws InterruptedException {}

        @Override
        public int loadMaxCapacity() {
          return 10;
        }

        @Override
        public List<UserRequestModel> getAllUsers() throws InterruptedException {
          return new ArrayList<>();
        }

        @Override
        public Map<UserRequestModel, SigninEmailIdPair> getAllUsersWhoAreSignedInDatabase()
            throws InterruptedException {
          return new HashMap<>();
        }

        @Override
        public void setMaxCapacity(int newMaxCapacity) throws InterruptedException {}

        @Override
        public void removeUser(UserRequestModel userModel) throws InterruptedException {}
      };

  final UsersManager usersManager = new UsersManager(databaseManager, new DatabaseConstants());

  @Test
  void testUserManager() {
    final UserRequestModel usera = new UserRequestModel("itai", "fish", "itai@fish");
    final UserRequestModel userb = new UserRequestModel("itai", "fish", "jimmy@fish");
    final SigninDataRequestModel signinDataRequestModel = new SigninDataRequestModel(null, 100.1);
    final NewUserRequestModel user1 = new NewUserRequestModel(usera, "", signinDataRequestModel);
    final NewUserRequestModel user2 = new NewUserRequestModel(userb, "", signinDataRequestModel);
    final SigninRequestModel userfoo = new SigninRequestModel(signinDataRequestModel, usera);
    usersManager.createAndSigninUser(user1);
    Result result = usersManager.userExists(usera);
    assertTrue(((UserExistsResult) result).isUserExists());
    result = usersManager.userExists(userb);
    assertFalse(((UserExistsResult) result).isUserExists());
    result = usersManager.signoutUser(usera);
    assertTrue(isOkay(result));
    result = usersManager.signoutUser(usera);
    assertFalse(isOkay(result));
    result = usersManager.signinUser(userfoo);
    assertTrue(isOkay(result));
    result = usersManager.signinUser(userfoo);
    assertFalse(isOkay(result));
    result = usersManager.signoutUser(usera);
    assertTrue(isOkay(result));
    result = usersManager.signoutUser(usera);
    assertFalse(isOkay(result));
  }

  @Test
  void testCapacity() throws InterruptedException {
    final List<UserRequestModel> users = new ArrayList<>();
    for (int i = 0; i <= databaseManager.loadMaxCapacity(); i++) {
      users.add(new UserRequestModel("itai", "fish" + i, "itai@fish" + i));
    }
    final SigninDataRequestModel signinDataRequestModel =
        new SigninDataRequestModel(null, Constants.FEVER_TEMPERATURE - 0.5);
    Result lastResult = new Result(200, "Dummy Information");
    for (int i = 0; i < users.size(); i++) {
      final UserRequestModel userRequestModel = users.get(i);
      final NewUserRequestModel newUser =
          new NewUserRequestModel(userRequestModel, "", signinDataRequestModel);
      lastResult = usersManager.createAndSigninUser(newUser);
      if (i < users.size() - 1) {
        assertTrue(isOkay(lastResult));
      }
    }
    assertFalse(isOkay(lastResult));
    assertEquals(409, lastResult.getStatusCode());
  }

  @Test
  void testSigninData() {
    final UserRequestModel userTooHot = new UserRequestModel("..", "iam", "toohot@gmail.com");
    final SigninDataRequestModel tooHotData =
        new SigninDataRequestModel(null, Constants.FEVER_TEMPERATURE + 0.5);
    final NewUserRequestModel newUserTooHot = new NewUserRequestModel(userTooHot, "", tooHotData);
    final Result result = usersManager.createAndSigninUser(newUserTooHot);
    assertFalse(isOkay(result));
    assertEquals(412, result.getStatusCode());
    final UserRequestModel userSaysYes = new UserRequestModel("..", "isaid", "yes@gmail.com");
    final SigninDataRequestModel yesData =
        new SigninDataRequestModel("I said yes lmao", Constants.FEVER_TEMPERATURE - 0.5);
    final NewUserRequestModel newUserYes = new NewUserRequestModel(userSaysYes, "", yesData);
    final Result result2 = usersManager.createAndSigninUser(newUserYes);
    assertFalse(isOkay(result2));
    assertEquals(412, result2.getStatusCode());
  }

  @Test
  void testDeleteUser() {
    final UserRequestModel user1 = new UserRequestModel("user1", "isme", "user1@gmail.com");
    final SigninDataRequestModel validSigninModel = new SigninDataRequestModel(null, 99);
    final NewUserRequestModel newUserRequestModel =
        new NewUserRequestModel(user1, "", validSigninModel);
    Result result = usersManager.createAndSigninUser(newUserRequestModel);
    assertTrue(isOkay(result));
    result = usersManager.deleteUser(user1);
    assertTrue(isOkay(result));
    result = usersManager.deleteUser(user1);
    assertFalse(isOkay(result));
  }

  @Test
  void loadAndSigningUsersFromDatabase() {
    final DatabaseManagerInterface databaseManagerWithSignedInUsers =
        new DatabaseManagerInterface() {
          @Override
          public void addUser(NewUserRequestModel userRequestModel) {}

          @Override
          public SigninEmailIdPair signinUser(SigninRequestModel signinRequestModel)
              throws InterruptedException {
            return new SigninEmailIdPair(
                UUID.randomUUID().toString(), Utility.nowToFullIso8601String());
          }

          @Override
          public void signOutUser(SigninEmailIdPair signInTimeAndId) throws InterruptedException {}

          @Override
          public void signOutUser(SigninEmailIdPair signInTimeAndId, String signoutTime)
              throws InterruptedException {}

          @Override
          public int loadMaxCapacity() {
            return 10;
          }

          @Override
          public List<UserRequestModel> getAllUsers() throws InterruptedException {
            return new ArrayList<>();
          }

          @Override
          public Map<UserRequestModel, SigninEmailIdPair> getAllUsersWhoAreSignedInDatabase()
              throws InterruptedException {
            return new HashMap<>();
          }

          @Override
          public void setMaxCapacity(int newMaxCapacity) throws InterruptedException {}

          @Override
          public void removeUser(UserRequestModel userModel) throws InterruptedException {}
        };
  }

  private boolean isOkay(final Result result) {
    return result.getStatusCode() >= 200 && result.getStatusCode() <= 299;
  }
}
