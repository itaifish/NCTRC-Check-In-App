package org.nctrc.backend.model.response;

import java.util.List;
import org.nctrc.backend.model.request.UserRequestModel;

public class UserListResponse {

  private final List<UserRequestModel> users;

  public UserListResponse(final List<UserRequestModel> users) {
    this.users = users;
  }

  public List<UserRequestModel> getUsers() {
    return users;
  }
}
