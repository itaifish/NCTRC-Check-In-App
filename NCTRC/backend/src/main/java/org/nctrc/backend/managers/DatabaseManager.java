package org.nctrc.backend.managers;

import javax.inject.Singleton;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;

@Singleton
public class DatabaseManager {
  public void addUser(final NewUserRequestModel userRequestModel) {
    // TODO: Implement
  }

  public void signinUser(final SigninRequestModel signinRequestModel) {
    // TODO: Implement
  }

  public int loadMaxCapacity() {
    // TODO: Allow getting and setting capacity
    return 10;
  }
}
