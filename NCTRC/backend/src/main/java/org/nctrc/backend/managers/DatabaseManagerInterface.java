package org.nctrc.backend.managers;

import java.util.List;
import java.util.Map;
import org.nctrc.backend.model.internal.SigninEmailIdPair;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;

public interface DatabaseManagerInterface {
  public void addUser(final NewUserRequestModel userRequestModel) throws InterruptedException;

  public SigninEmailIdPair signinUser(final SigninRequestModel signinRequestModel)
      throws InterruptedException;

  public void signOutUser(final SigninEmailIdPair signinEmailIdPair) throws InterruptedException;

  public void signOutUser(final SigninEmailIdPair signinEmailIdPair, final String signoutTime)
      throws InterruptedException;

  public int loadMaxCapacity() throws InterruptedException;

  public List<UserRequestModel> getAllUsers() throws InterruptedException;

  public Map<UserRequestModel, SigninEmailIdPair> getAllUsersWhoAreSignedInDatabase()
      throws InterruptedException;

  public boolean verifyPin(final String pin) throws InterruptedException;

  public void setMaxCapacity(final int newMaxCapacity) throws InterruptedException;

  public void removeUser(UserRequestModel userModel) throws InterruptedException;
}
