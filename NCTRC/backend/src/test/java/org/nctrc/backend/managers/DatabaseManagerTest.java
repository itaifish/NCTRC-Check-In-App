package org.nctrc.backend.managers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.nctrc.backend.config.DatabaseConstants;
import org.nctrc.backend.model.internal.SigninEmailIdPair;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninDataRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;

public class DatabaseManagerTest {

  static final DatabaseManagerInterface databaseManger =
      new DatabaseManager(new DatabaseConstants());

  @Test
  void testDatabaseManager() {

    final UserRequestModel testUser = new UserRequestModel("Ben?", "Meadows?", "@gmail.com?");
    final SigninDataRequestModel signinData = new SigninDataRequestModel(null, 98.5);
    final NewUserRequestModel newUserRequestModel =
        new NewUserRequestModel(testUser, "signature", signinData);
    int currentDatabaseUsers = 0;
    int currentSignedInUsers = 0;
    try {
      final List<UserRequestModel> allUsers = databaseManger.getAllUsers();
      if (allUsers.contains(testUser)) {
        databaseManger.removeUser(testUser);
      }
      currentDatabaseUsers = databaseManger.getAllUsers().size();
      currentSignedInUsers = databaseManger.getAllUsersWhoAreSignedInDatabase().keySet().size();
    } catch (InterruptedException e) {
      fail(e);
    }
    SigninEmailIdPair singinKey = null;
    // Create user and sign them in
    try {
      databaseManger.addUser(newUserRequestModel);
      singinKey = databaseManger.signinUser(new SigninRequestModel(signinData, testUser));
    } catch (InterruptedException e) {
      fail(e);
    }
    // Make sure you can get all users and singed in users, and that they are the same and have only
    // 1 entrant
    try {
      final List<UserRequestModel> allUsers = databaseManger.getAllUsers();
      final List<UserRequestModel> signedInUsers =
          new ArrayList<>(databaseManger.getAllUsersWhoAreSignedInDatabase().keySet());
      assertEquals(1 + currentDatabaseUsers, allUsers.size());
      assertEquals(1 + currentSignedInUsers, signedInUsers.size());
      assertEquals(allUsers.get(0), signedInUsers.get(0));
    } catch (InterruptedException e) {
      fail(e);
    }
    // Sign out the user and see if that works
    try {
      databaseManger.signOutUser(singinKey);
      final List<UserRequestModel> allUsers = databaseManger.getAllUsers();
      final List<UserRequestModel> signedInUsers =
          new ArrayList<>(databaseManger.getAllUsersWhoAreSignedInDatabase().keySet());
      assertEquals(1 + currentDatabaseUsers, allUsers.size());
      assertEquals(currentSignedInUsers, signedInUsers.size());
    } catch (InterruptedException e) {
      fail(e);
    }

    // Delete user

    try {
      databaseManger.removeUser(testUser);
      final List<UserRequestModel> allUsers = databaseManger.getAllUsers();
      final List<UserRequestModel> signedInUsers =
          new ArrayList<>(databaseManger.getAllUsersWhoAreSignedInDatabase().keySet());
      assertEquals(currentDatabaseUsers, allUsers.size());
      assertEquals(currentSignedInUsers, signedInUsers.size());
    } catch (InterruptedException e) {
      fail(e);
    }
  }
}
