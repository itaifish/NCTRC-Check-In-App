package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SigninDataRequestModel {

  private final String yesQuestion;

  private final double temperature;

  public SigninDataRequestModel(
      @JsonProperty() final String yesQuestion, @JsonProperty() final double temperature) {
    this.yesQuestion = yesQuestion;
    this.temperature = temperature;
  }

  public String getYesQuestion() {
    return yesQuestion;
  }

  public double getTemperature() {
    return temperature;
  }
}
