package org.nctrc.backend.managers;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.nctrc.backend.model.request.RequestUserModel;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.model.response.UserExistsResult;

public class UserManagerTest {

  @Test
  void testUserManager() {
    final UsersManager usersManager = new UsersManager();
    final RequestUserModel user1 = new RequestUserModel("fish", "itai@fish");
    final RequestUserModel user2 = new RequestUserModel("fish", "jimmy@fish");
    usersManager.addUser(user1);
    Result result = usersManager.userExists(user1);
    assertTrue(((UserExistsResult) result).isUserExists());
    result = usersManager.userExists(user2);
    assertFalse(((UserExistsResult) result).isUserExists());
    result = usersManager.signoutUser(user1);
    assertFalse(isOkay(result));
    result = usersManager.signinUser(user1);
    assertTrue(isOkay(result));
    result = usersManager.signoutUser(user1);
    assertTrue(isOkay(result));
  }

  private boolean isOkay(final Result result) {
    return result.getStatusCode() >= 200 && result.getStatusCode() <= 300;
  }
}
