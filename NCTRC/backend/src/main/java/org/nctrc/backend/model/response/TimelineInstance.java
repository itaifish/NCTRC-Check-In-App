package org.nctrc.backend.model.response;

import java.util.Date;
import org.nctrc.backend.model.request.SigninDataRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;

public class TimelineInstance {
  final UserRequestModel user;

  final SigninDataRequestModel signinData;

  final Date signinTime;

  final Date signoutTime;

  public TimelineInstance(
      final UserRequestModel user,
      final SigninDataRequestModel signinData,
      final Date signinTime,
      final Date signoutTime) {
    this.user = user;
    this.signinData = signinData;
    this.signinTime = signinTime;
    this.signoutTime = signoutTime;
  }

  public UserRequestModel getUser() {
    return user;
  }

  public SigninDataRequestModel getSigninData() {
    return signinData;
  }

  public Date getSigninTime() {
    return signinTime;
  }

  public Date getSignoutTime() {
    return signoutTime;
  }
}
