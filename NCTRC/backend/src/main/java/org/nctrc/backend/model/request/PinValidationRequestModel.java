package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PinValidationRequestModel {

  private final String pin;

  public PinValidationRequestModel(@JsonProperty("pin") final String pin) {
    this.pin = pin;
  }

  public String getPin() {
    return pin;
  }
}
