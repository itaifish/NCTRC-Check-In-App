package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class NewUserRequestModel {

  private final UserRequestModel user;

  private final String signature;

  private final SigninDataRequestModel signinData;

  @JsonCreator
  public NewUserRequestModel(
      @JsonProperty("user") final UserRequestModel user,
      @JsonProperty("signature") final String signature,
      @JsonProperty("signinData") final SigninDataRequestModel signinData) {
    this.user = user;
    this.signature = signature;
    this.signinData = signinData;
  }

  public UserRequestModel getUser() {
    return user;
  }

  public String getSignature() {
    return signature;
  }

  public SigninDataRequestModel getSigninData() {
    return signinData;
  }
}
