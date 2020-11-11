package org.nctrc.backend.config;

import com.amazonaws.regions.Regions;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

public final class Constants {

  public static final String MAIN_PATH = "api/";

  public static final String USER_PATH = "user/";

  public static final String ADMIN_PATH = "admin/";

  public static final String ADMIN_UPDATE_CAPACITY_PATH = "capacity";

  public static final String ADMIN_LOGGED_IN_PATH = "loggedin";

  public static final String ADMIN_USERS_PATH = "users";

  public static final String USER_SIGNIN_PATH = "signin";

  public static final String USER_SIGNOUT_PATH = "signout";

  public static final String USER_CREATION_PATH = "create";

  public static final String USER_DELETION_PATH = "delete";

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

  public static final SimpleDateFormat ISO_8601 = new SimpleDateFormat("yyyy-MM-dd");

  public static final SimpleDateFormat ISO_8601_FULL =
      new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

  public static final TimeZone TIME_ZONE = TimeZone.getTimeZone("America/New_York");

  private Constants() {}
}
