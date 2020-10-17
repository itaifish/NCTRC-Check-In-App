package org.nctrc.backend.managers;

import java.util.List;
import java.util.Map;
import org.nctrc.backend.model.internal.SigninTimeIdPair;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;

public interface DatabaseManagerInterface {
  public void addUser(final NewUserRequestModel userRequestModel) throws InterruptedException;

  public SigninTimeIdPair signinUser(final SigninRequestModel signinRequestModel)
      throws InterruptedException;

  public void signOutUser(final SigninTimeIdPair signInTimeAndId) throws InterruptedException;

  public void signOutUser(final SigninTimeIdPair signInTimeAndId, final String signoutTime)
      throws InterruptedException;

  public int loadMaxCapacity() throws InterruptedException;

  public List<UserRequestModel> getAllUsers() throws InterruptedException;

  public Map<UserRequestModel, SigninTimeIdPair> getAllUsersWhoAreSignedInDatabase()
      throws InterruptedException;

  public void setMaxCapacity(final int newMaxCapacity) throws InterruptedException;
}
