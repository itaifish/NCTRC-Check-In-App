package org.nctrc.backend.model.response;

import java.util.List;

public class TimelineListResponse {

  private final List<TimelineInstance> timelineInstance;

  public TimelineListResponse(final List<TimelineInstance> timelineInstance) {
    this.timelineInstance = timelineInstance;
  }

  public List<TimelineInstance> getUsers() {
    return timelineInstance;
  }
}
