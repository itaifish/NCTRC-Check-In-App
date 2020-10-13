package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SigninRequestModel {

  private final SigninDataRequestModel signinData;

  private final UserRequestModel user;

  public SigninRequestModel(
      @JsonProperty("signinData") final SigninDataRequestModel signinData,
      @JsonProperty("user") final UserRequestModel user) {
    this.signinData = signinData;
    this.user = user;
  }

  public SigninDataRequestModel getSigninData() {
    return signinData;
  }

  public UserRequestModel getUser() {
    return user;
  }
}
