package org.nctrc.backend.model.response;

public class Result {

  private final int statusCode;

  private final String information;

  public Result(final int statusCode, final String information) {
    this.statusCode = statusCode;
    this.information = information;
  }

  public int getStatusCode() {
    return statusCode;
  }

  public String getInformation() {
    return information;
  }

  @Override
  public String toString() {
    return "Result{" + "statusCode=" + statusCode + ", information='" + information + '\'' + '}';
  }
}
