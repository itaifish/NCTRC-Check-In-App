package org.nctrc.backend.utility;

import java.util.Date;
import org.apache.commons.lang3.time.DateUtils;
import org.nctrc.backend.config.Constants;

public class Utility {

  public static String nowToFullIso8601String() {
    Constants.ISO_8601_FULL.setTimeZone(Constants.TIME_ZONE);
    return Constants.ISO_8601_FULL.format(new Date());
  }

  public static String failedSignedoutTimeToFullIso8601String() {
    Constants.ISO_8601_FULL.setTimeZone(Constants.TIME_ZONE);
    return Constants.ISO_8601_FULL.format(
        DateUtils.addMinutes(new Date(), Constants.NUM_MINS_FOR_REJECTED_SIGNIN));
  }
}
