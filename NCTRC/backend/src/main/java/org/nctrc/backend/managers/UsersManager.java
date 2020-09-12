package org.nctrc.backend.managers;

import io.javalin.http.Context;
import org.nctrc.backend.model.Result;

public interface UsersManager {

  public Result signinUser(final Context context);
}
