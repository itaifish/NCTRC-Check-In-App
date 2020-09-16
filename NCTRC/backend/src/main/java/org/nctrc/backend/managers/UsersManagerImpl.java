package org.nctrc.backend.managers;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import org.nctrc.backend.model.internal.DayTimeline;
import org.nctrc.backend.model.request.RequestUserModel;
import org.nctrc.backend.model.response.Result;

public class UsersManagerImpl implements UsersManager {

  private final Set<RequestUserModel> users;

  private final DayTimeline signinTimeLine;

  public UsersManagerImpl() {
    users = new HashSet<>();
    signinTimeLine = new DayTimeline(new Date());
  }

  @Override
  public Result signinUser(final RequestUserModel user) {
    if (users.contains(user)) {
      if (!signinTimeLine.isUserSignedIn(user)) {
        signinTimeLine.signUserIn(user);
        return new Result(200, "Success");
      } else {
        return new Result(405, "User is already signed in");
      }
    } else {
      return new Result(404, "User does not exist");
    }
  }

  public Result signoutUser(final RequestUserModel user) {
    if (users.contains(user)) {
      if (signinTimeLine.isUserSignedIn(user)) {
        signinTimeLine.signUserOut(user);
        return new Result(200, "Success");
      } else {
        return new Result(405, "User is not signed in to be signed out");
      }
    } else {
      return new Result(404, "User does not exist");
    }
  }

  @Override
  public Result addUser(final RequestUserModel user) {
    if (users.contains(user)) {
      return new Result(405, "Email " + user.getEmail() + " already exists!");
    } else {
      signinTimeLine.addUser(user);
      users.add(user);
      return new Result(200, "Success");
    }
  }
}
