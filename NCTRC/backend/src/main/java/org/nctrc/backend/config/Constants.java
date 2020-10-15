package org.nctrc.backend.config;

import com.amazonaws.regions.Regions;

public final class Constants {

  public static final String MAIN_PATH = "api/";

  public static final String USER_PATH = "user/";

  public static final String USER_SIGNIN_PATH = "signin";

  public static final String USER_SIGNOUT_PATH = "signout";

  public static final String USER_CREATION_PATH = "create";

  public static final String USER_EXISTS_PATH = "exists";

  public static final String VERSION = "0.0.1";

  public static final String TITLE = "Check-in API";

  public static final String DESCRIPTION =
      "API for User check-in and contact tracing for NC-Therapeutic Riding Center";

  public static final String DEFAULT_CONFIG_TYPE = "application/json";

  public static final String HOST_IP = "0.0.0.0";

  public static final int PORT = 6600;

  public static final int SSL_PORT = 6700;

  public static final int NUM_MINS_FOR_REJECTED_SIGNIN = 5;

  public static final double FEVER_TEMPERATURE = 100.4;

  public static final Regions REGION = Regions.US_EAST_1;

  private Constants() {}
}
