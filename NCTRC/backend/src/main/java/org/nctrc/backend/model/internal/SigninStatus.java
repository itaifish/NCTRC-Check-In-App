package org.nctrc.backend.model.internal;

import java.util.Date;
import java.util.concurrent.ConcurrentSkipListSet;

public class SigninStatus {

  private final ConcurrentSkipListSet<TimeRange> timeRanges;

  private boolean isSignedIn;

  /*
  This String tracks the uuid of the most recent signin request to sign out of
   */
  private String uuid;

  public SigninStatus() {
    this.isSignedIn = false;
    this.timeRanges = new ConcurrentSkipListSet<>();
    this.uuid = null;
  }

  public ConcurrentSkipListSet<TimeRange> getTimeRanges() {
    return timeRanges;
  }

  public boolean isSignedIn() {
    return isSignedIn;
  }

  public String getUuid() {
    return uuid;
  }

  public void setSignedIn(final String uuid) {
    if (this.isSignedIn()) {
      throw new IllegalStateException("Can't sign in when already signed in");
    }
    this.uuid = uuid;
    if (!timeRanges.isEmpty()) {
      final TimeRange newestTime = timeRanges.last();
      if (newestTime.getEndTime() == null) {
        throw new IllegalStateException(
            "User is not yet signed in, but last timerange does not have an ending time");
      } else {
        this.isSignedIn = true;
        timeRanges.add(new TimeRange(new Date(), null));
      }
    } else {
      this.isSignedIn = true;
      timeRanges.add(new TimeRange(new Date(), null));
    }
  }

  public void setSignedOut() {
    if (!this.isSignedIn) {
      throw new IllegalStateException("Can't sign out when already signed out");
    }
    this.uuid = null;
    if (!timeRanges.isEmpty()) {
      final TimeRange newestTime = timeRanges.last();
      if (newestTime.getEndTime() != null) {
        throw new IllegalStateException(
            "User is not yet signed out, but last timerange already has an ending time");
      } else {
        this.isSignedIn = false;
        newestTime.setEndTime(new Date());
      }
    } else {
      this.isSignedIn = false;
      timeRanges.add(new TimeRange(new Date(), null));
    }
  }
}
