package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public class SigninsBetweenRequest {

  private final Date startTime;

  private final Date endTime;

  public SigninsBetweenRequest(
      @JsonProperty("startTime") final Date startTime,
      @JsonProperty("endTime") final Date endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public Date getStartTime() {
    return startTime;
  }

  public Date getEndTime() {
    return endTime;
  }
}
