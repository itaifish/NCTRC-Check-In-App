package org.nctrc.backend.model.internal;

public class SigninTimeIdPair {

  private final String id;

  private final String signinTime;

  public SigninTimeIdPair(String id, String signinTime) {
    this.id = id;
    this.signinTime = signinTime;
  }

  public String getId() {
    return id;
  }

  public String getSigninTime() {
    return signinTime;
  }
}
