package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public class NewUserRequestModel {

  private final UserRequestModel user;

  private final String signature;

  private final Date signatureDate;

  private final SigninDataRequestModel signinData;

  public NewUserRequestModel(
      @JsonProperty() final UserRequestModel user,
      @JsonProperty() final String signature,
      @JsonProperty() final Date signatureDate,
      @JsonProperty() final SigninDataRequestModel signinData) {
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
