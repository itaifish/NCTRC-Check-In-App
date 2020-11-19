package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SigninDataRequestModel {

  private final String yesQuestion;

  private final double temperature;

  private final String visitorType;

  @JsonCreator
  public SigninDataRequestModel(
      @JsonProperty("yesQuestion") final String yesQuestion,
      @JsonProperty("temperature") final double temperature,
      @JsonProperty("visitorType") final String visitorType) {
    this.yesQuestion = yesQuestion;
    this.temperature = temperature;
    this.visitorType = visitorType;
  }

  public String getYesQuestion() {
    return yesQuestion;
  }

  public double getTemperature() {
    return temperature;
  }

  public String getVisitorType() {
    return visitorType;
  }
}
