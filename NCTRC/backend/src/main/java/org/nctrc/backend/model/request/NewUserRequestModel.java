package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public class NewUserRequestModel {

  private final UserRequestModel user;

  private final String signature;

  private final Date signatureDate;

  private final SigninDataRequestModel signinData;

  @JsonCreator
  public NewUserRequestModel(
      @JsonProperty("user") final UserRequestModel user,
      @JsonProperty("signature") final String signature,
      @JsonProperty("signatureData") final Date signatureDate,
      @JsonProperty("signinData") final SigninDataRequestModel signinData) {
    this.user = user;
    this.signature = signature;
    this.signatureDate = signatureDate;
    this.signinData = signinData;
  }

  public UserRequestModel getUser() {
    return user;
  }

  public String getSignature() {
    return signature;
  }

  public Date getSignatureDate() {
    return signatureDate;
  }

  public SigninDataRequestModel getSigninData() {
    return signinData;
  }
}
