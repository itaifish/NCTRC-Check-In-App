package org.nctrc.backend.utility;

import java.text.ParseException;
import java.util.Date;
import org.apache.commons.lang3.time.DateUtils;
import org.nctrc.backend.config.Constants;

public class Utility {

  private Utility() {}

  public static String dateToFullIso8601String(final Date date) {
    Constants.ISO_8601_FULL.setTimeZone(Constants.TIME_ZONE);
    return Constants.ISO_8601_FULL.format(date);
  }

  public static String nowToFullIso8601String() {
    return dateToFullIso8601String(new Date());
  }

  public static Date stringToDate(final String date) throws ParseException {
    if (date == null) {
      return null;
    }
    Constants.ISO_8601_FULL.setTimeZone(Constants.TIME_ZONE);
    return Constants.ISO_8601_FULL.parse(date);
  }

  public static String failedSignedoutTimeToFullIso8601String() {
    Constants.ISO_8601_FULL.setTimeZone(Constants.TIME_ZONE);
    return Constants.ISO_8601_FULL.format(
        DateUtils.addMinutes(new Date(), Constants.NUM_MINS_FOR_REJECTED_SIGNIN));
  }
}
