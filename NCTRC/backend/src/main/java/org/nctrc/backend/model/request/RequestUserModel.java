package org.nctrc.backend.model.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Objects;

public class RequestUserModel {

  private final String name;
  private final String email;

  @JsonCreator
  public RequestUserModel(
      @JsonProperty("name") final String name, @JsonProperty("email") final String email) {
    this.name = name;
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RequestUserModel user = (RequestUserModel) o;
    return email.equals(user.email);
  }

  @Override
  public int hashCode() {
    return Objects.hash(email);
  }
}
