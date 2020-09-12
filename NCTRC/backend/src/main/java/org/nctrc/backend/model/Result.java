package org.nctrc.backend.model;

public class Result {

  private final int statusCode;

  private final String information;

  public Result(int statusCode, String information) {
    this.statusCode = statusCode;
    this.information = information;
  }

  public int getStatusCode() {
    return statusCode;
  }

  public String getInformation() {
    return information;
  }
}
