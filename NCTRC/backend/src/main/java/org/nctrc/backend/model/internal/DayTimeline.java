package org.nctrc.backend.model.internal;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import org.nctrc.backend.model.request.RequestUserModel;

/** This class represents the timeline of a single day with people signin into the clinic */
public class DayTimeline {

  private Date day;

  private Map<RequestUserModel, SigninStatus> usersStatus;

  public DayTimeline(final Date day) {
    this.day = day;
    usersStatus = new HashMap<>();
  }

  public void addUser(final RequestUserModel userModel) {
    if (userExists(userModel)) {
      throw new IllegalArgumentException("User " + userModel + " already exists");
    } else {
      usersStatus.put(userModel, new SigninStatus());
    }
  }

  public boolean isUserSignedIn(final RequestUserModel userModel) {
    if (userExists(userModel)) {
      return usersStatus.get(userModel).isSignedIn();
    } else {
      return false;
    }
  }

  public void signUserIn(final RequestUserModel userModel) {
    if (userExists(userModel)) {
      usersStatus.get(userModel).setSignedIn();
    } else {
      throw new IllegalArgumentException("User " + userModel + " does not exist");
    }
  }

  public void signUserOut(final RequestUserModel userModel) {
    if (userExists(userModel)) {
      usersStatus.get(userModel).setSignedOut();
    } else {
      throw new IllegalArgumentException("User " + userModel + " does not exist");
    }
  }

  public boolean userExists(final RequestUserModel userModel) {
    return usersStatus.containsKey(userModel);
  }

  public Set<TimeRange> getSigninTimesForUser(final RequestUserModel userModel) {
    if (userExists(userModel)) {
      return usersStatus.get(userModel).getTimeRanges();
    } else {
      throw new IllegalArgumentException("User " + userModel + " does not exist");
    }
  }
}
