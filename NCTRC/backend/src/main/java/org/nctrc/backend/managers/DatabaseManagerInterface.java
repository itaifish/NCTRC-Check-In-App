package org.nctrc.backend.managers;

import java.util.List;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;

public interface DatabaseManagerInterface {
  public void addUser(final NewUserRequestModel userRequestModel);

  public void signinUser(final SigninRequestModel signinRequestModel);

  public int loadMaxCapacity();

  public List<UserRequestModel> getAllUsers() throws InterruptedException;
}
