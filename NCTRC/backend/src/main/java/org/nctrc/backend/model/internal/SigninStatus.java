package org.nctrc.backend.model.internal;

public class SigninStatus {
  /*
  This String tracks the uuid of the most recent signin request to sign out of
   */
  private SigninTimeIdPair signInTimeAndId;

  public SigninStatus() {
    this.signInTimeAndId = null;
  }

  public boolean isSignedIn() {
    return this.signInTimeAndId != null;
  }

  public SigninTimeIdPair getSignInTimeAndId() {
    return signInTimeAndId;
  }

  public void setSignedIn(final SigninTimeIdPair signInTimeAndId) {
    if (this.isSignedIn()) {
      throw new IllegalStateException("Can't sign in when already signed in");
    }
    this.signInTimeAndId = signInTimeAndId;
  }

  public void setSignedOut() {
    if (!this.isSignedIn()) {
      throw new IllegalStateException("Can't sign out when already signed out");
    }
    this.signInTimeAndId = null;
  }
}
