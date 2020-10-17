package org.nctrc.backend.model.internal;


public class SigninStatus {

  private boolean isSignedIn;

  /*
  This String tracks the uuid of the most recent signin request to sign out of
   */
  private String uuid;

  public SigninStatus() {
    this.isSignedIn = false;
    this.uuid = null;
  }

  public boolean isSignedIn() {
    return isSignedIn;
  }

  public String getUuid() {
    return uuid;
  }

  public void setSignedIn(final String uuid) {
    if (this.isSignedIn()) {
      throw new IllegalStateException("Can't sign in when already signed in");
    }
    this.uuid = uuid;
  }

  public void setSignedOut() {
    if (!this.isSignedIn) {
      throw new IllegalStateException("Can't sign out when already signed out");
    }
    this.uuid = null;
  }
}
