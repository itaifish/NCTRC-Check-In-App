package org.nctrc.backend.managers;

import io.javalin.http.Context;
import java.util.HashSet;
import java.util.Set;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.model.response.User;

public class UsersManagerImpl implements UsersManager {

  private Set<User> users;

  public UsersManagerImpl() {
    users = new HashSet<>();
  }

  @Override
  public Result signinUser(final User user) {
    if (users.contains(user)) {
      // set user to be signed in
      return new Result(200, "Success");
    } else {
      return new Result(401, "User does not exist");
    }
  }

  @Override
  public Result addUser(final Context context) {

    return null;
  }
}
