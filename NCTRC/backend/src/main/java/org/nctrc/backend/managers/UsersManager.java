package org.nctrc.backend.managers;

import io.javalin.http.Context;
import org.nctrc.backend.model.response.Result;

public interface UsersManager {

  public Result signinUser(final Context context);

  public Result addUser(final Context context);
}
