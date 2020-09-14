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
  public Result signinUser(final Context context) {
    return new Result(200, "Success");
  }

  @Override
  public Result addUser(final Context context) {

    return null;
  }
}
