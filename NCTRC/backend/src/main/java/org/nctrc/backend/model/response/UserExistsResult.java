package org.nctrc.backend.model.response;

public class UserExistsResult extends Result {

  private final boolean userExists;

  public UserExistsResult(
      final int statusCode, final String information, final boolean userExists) {
    super(statusCode, information);
    this.userExists = userExists;
  }

  public boolean isUserExists() {
    return userExists;
  }
}
