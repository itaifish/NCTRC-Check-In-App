package org.nctrc.backend.managers;

import org.nctrc.backend.model.request.RequestUserModel;
import org.nctrc.backend.model.response.Result;

public interface UsersManager {

  public Result signinUser(final RequestUserModel user);

  public Result addUser(final RequestUserModel user);
}
