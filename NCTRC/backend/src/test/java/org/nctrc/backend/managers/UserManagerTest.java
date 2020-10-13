package org.nctrc.backend.managers;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;
import org.junit.jupiter.api.Test;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninDataRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.model.response.UserExistsResult;

public class UserManagerTest {

  @Test
  void testUserManager() {
    final DatabaseManager databaseManager = new DatabaseManager();
    final UsersManager usersManager = new UsersManager(databaseManager);
    final UserRequestModel usera = new UserRequestModel("fish", "itai@fish");
    final UserRequestModel userb = new UserRequestModel("fish", "jimmy@fish");
    final SigninDataRequestModel signinDataRequestModel = new SigninDataRequestModel(null, 100.1);
    final NewUserRequestModel user1 =
        new NewUserRequestModel(usera, "", new Date(), signinDataRequestModel);
    final NewUserRequestModel user2 =
        new NewUserRequestModel(userb, "", new Date(), signinDataRequestModel);
    final SigninRequestModel userfoo = new SigninRequestModel(signinDataRequestModel, usera);
    usersManager.addUser(user1);
    Result result = usersManager.userExists(usera);
    assertTrue(((UserExistsResult) result).isUserExists());
    result = usersManager.userExists(userb);
    assertFalse(((UserExistsResult) result).isUserExists());
    result = usersManager.signoutUser(usera);
    assertFalse(isOkay(result));
    result = usersManager.signinUser(userfoo);
    assertTrue(isOkay(result));
    result = usersManager.signoutUser(usera);
    assertTrue(isOkay(result));
  }

  private boolean isOkay(final Result result) {
    return result.getStatusCode() >= 200 && result.getStatusCode() <= 299;
  }
}
