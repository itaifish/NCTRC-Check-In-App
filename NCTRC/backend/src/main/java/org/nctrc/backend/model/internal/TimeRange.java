package org.nctrc.backend.model.internal;

import java.util.Date;
import org.jetbrains.annotations.NotNull;

public class TimeRange implements Comparable<TimeRange> {

  private final Date startTime;

  private Date endTime;

  public TimeRange(final Date startTime, final Date endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public Date getStartTime() {
    return startTime;
  }

  public Date getEndTime() {
    return endTime;
  }

  public void setEndTime(final Date endTime) {
    this.endTime = endTime;
  }

  /**
   * Sort by starting time, since the timelines should have no overlap
   *
   * @param o other timerange
   * @return -1 if before, 1 if after, 0 if equivalent
   */
  @Override
  public int compareTo(@NotNull TimeRange o) {
    return this.getStartTime().compareTo(o.getStartTime());
  }
}
