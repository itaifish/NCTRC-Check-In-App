package org.nctrc.backend.managers;

import io.javalin.http.Context;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.model.response.User;

public interface UsersManager {

  public Result signinUser(final User user);

  public Result addUser(final Context context);
}
