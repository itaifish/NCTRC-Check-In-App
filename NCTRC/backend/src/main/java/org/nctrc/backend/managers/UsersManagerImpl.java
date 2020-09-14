package org.nctrc.backend.managers;

import java.util.HashSet;
import java.util.Set;
import org.nctrc.backend.model.request.RequestUserModel;
import org.nctrc.backend.model.response.Result;

public class UsersManagerImpl implements UsersManager {

  private Set<RequestUserModel> users;

  public UsersManagerImpl() {
    users = new HashSet<>();
  }

  @Override
  public Result signinUser(final RequestUserModel user) {
    if (users.contains(user)) {
      // set user to be signed in

      //
      return new Result(200, "Success");
    } else {
      return new Result(401, "User does not exist");
    }
  }

  @Override
  public Result addUser(final RequestUserModel user) {
    if (users.contains(user)) {
      return new Result(401, "Email " + user.getEmail() + " already exists!");
    } else {
      // add user and set to be signed in

      return new Result(200, "Success");
    }
  }
}
