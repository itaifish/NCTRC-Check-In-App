package org.nctrc.backend.model.internal;

public class SigninStatus {
  /*
  This String tracks the uuid of the most recent signin request to sign out of
   */
  private SigninEmailIdPair signInEmailAndId;

  public SigninStatus() {
    this.signInEmailAndId = null;
  }

  public boolean isSignedIn() {
    return this.signInEmailAndId != null;
  }

  public SigninEmailIdPair getSignInEmailAndId() {
    return signInEmailAndId;
  }

  public void setSignedIn(final SigninEmailIdPair signinEmailIdPair) {
    if (this.isSignedIn()) {
      throw new IllegalStateException("Can't sign in when already signed in");
    }
    this.signInEmailAndId = signinEmailIdPair;
  }

  public void setSignedOut() {
    if (!this.isSignedIn()) {
      throw new IllegalStateException("Can't sign out when already signed out");
    }
    this.signInEmailAndId = null;
  }
}
