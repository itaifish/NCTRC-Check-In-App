package org.nctrc.backend.managers;

import io.javalin.http.Context;
import org.nctrc.backend.model.Result;

public class UsersManagerImpl implements UsersManager {

  @Override
  public Result signinUser(final Context context) {
    return new Result(200, "Success");
  }
}
