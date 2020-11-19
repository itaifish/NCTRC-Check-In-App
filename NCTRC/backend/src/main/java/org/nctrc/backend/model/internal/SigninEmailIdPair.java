package org.nctrc.backend.model.internal;

public class SigninEmailIdPair {

  private final String id;

  private final String email;

  public SigninEmailIdPair(final String id, final String email) {
    this.id = id;
    this.email = email;
  }

  public String getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }
}
