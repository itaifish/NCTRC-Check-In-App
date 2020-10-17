package org.nctrc.backend.utility;

import java.util.Date;
import org.nctrc.backend.config.Constants;

public class Utility {

  public static String nowToFullIso8601String() {
    Constants.ISO_8601_FULL.setTimeZone(Constants.TIME_ZONE);
    return Constants.ISO_8601_FULL.format(new Date());
  }
}
