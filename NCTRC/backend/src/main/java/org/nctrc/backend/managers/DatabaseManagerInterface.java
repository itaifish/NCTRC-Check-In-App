package org.nctrc.backend.managers;

import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;

public interface DatabaseManagerInterface {
  public void addUser(final NewUserRequestModel userRequestModel);

  public void signinUser(final SigninRequestModel signinRequestModel);

  public int loadMaxCapacity();
}
