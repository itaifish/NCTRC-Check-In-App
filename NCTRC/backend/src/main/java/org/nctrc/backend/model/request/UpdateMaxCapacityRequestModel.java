package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateMaxCapacityRequestModel {

  private final int maxCapacity;

  @JsonCreator
  public UpdateMaxCapacityRequestModel(@JsonProperty("maxCapacity") final int maxCapacity) {
    this.maxCapacity = maxCapacity;
  }

  public int getMaxCapacity() {
    return maxCapacity;
  }
}
