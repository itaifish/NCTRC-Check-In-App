package org.nctrc.backend.managers;

import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.config.DatabaseConstants;
import org.nctrc.backend.model.internal.DayTimeline;
import org.nctrc.backend.model.internal.SigninTimeIdPair;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninDataRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.model.response.UserExistsResult;
import org.nctrc.backend.utility.Utility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class UsersManager {

  private static final Logger logger = LoggerFactory.getLogger(UsersManager.class);

  private final Set<UserRequestModel> users;

  private final DayTimeline signinTimeLine;

  private final DatabaseManagerInterface databaseManager;

  private int maxCapacity;

  private int currentCapacity;

  @Inject
  public UsersManager(
      final DatabaseManagerInterface databaseManager, final DatabaseConstants databaseConstants) {
    users = new HashSet<>();
    signinTimeLine = new DayTimeline(new Date());
    this.databaseManager = databaseManager;
    try {
      this.maxCapacity = databaseManager.loadMaxCapacity();
    } catch (InterruptedException e) {
      this.maxCapacity = databaseConstants.DEFAULT_MAX_CAPACITY;
    }
    this.currentCapacity = 0;
    try {
      users.addAll(databaseManager.getAllUsers());
      users.forEach(signinTimeLine::addUser);
    } catch (InterruptedException e) {
      logger.warn("Unable to load users from database: " + e.toString());
    }
    try {
      final Map<UserRequestModel, SigninTimeIdPair> usersSignedIn =
          databaseManager.getAllUsersWhoAreSignedInDatabase();
      usersSignedIn
          .keySet()
          .forEach(
              userRequestModel -> {
                signinTimeLine.signUserIn(userRequestModel, usersSignedIn.get(userRequestModel));
              });
    } catch (InterruptedException e) {
      logger.warn("Unable to load signed in users from database: " + e.toString());
    }
  }

  public Result signinUser(final SigninRequestModel signinRequestModel) {
    final UserRequestModel user = signinRequestModel.getUser();
    final Result result;
    if (users.contains(user)) {
      // TODO: Validate signin to make sure @ capacity and questions are valid
      if (!signinTimeLine.isUserSignedIn(user)) {
        if (this.currentCapacity < this.maxCapacity) {
          final SigninDataRequestModel signinData = signinRequestModel.getSigninData();
          if (signinData.getTemperature() <= Constants.FEVER_TEMPERATURE
              && signinData.getYesQuestion() == null) {

            try {
              final SigninTimeIdPair signInTimeAndId =
                  databaseManager.signinUser(signinRequestModel);
              signinTimeLine.signUserIn(user, signInTimeAndId);
              this.currentCapacity++;
              return new Result(200, "Success");
            } catch (InterruptedException e) {
              result = new Result(500, "Unable to write to database");
            }
          } else {
            final String information =
                signinData.getYesQuestion() == null
                    ? "Your temperature is too high: " + signinData.getTemperature()
                    : "You answered yes to \"" + signinData.getYesQuestion() + "\"";
            result = new Result(412, information);
          }
        } else {
          result = new Result(409, "At Capacity - Try again later");
        }
      } else {
        result = new Result(405, "User is already signed in");
      }
    } else {
      result = new Result(404, "User does not exist");
    }
    // those code runs if a user tries to signin but there is an error
    try {
      // Sign user in and then out
      final SigninTimeIdPair signInTimeAndId = databaseManager.signinUser(signinRequestModel);
      databaseManager.signOutUser(
          signInTimeAndId, Utility.failedSignedoutTimeToFullIso8601String());
    } catch (Exception e) {
      logger.warn("Error signing user in/out: " + e.toString());
      // do nothing, already returning due to result
    }
    return result;
  }

  public Result signoutUser(final UserRequestModel user) {
    if (users.contains(user)) {
      if (signinTimeLine.isUserSignedIn(user)) {
        try {
          final SigninTimeIdPair signInId = signinTimeLine.getUserSigninTimeAndId(user);
          this.databaseManager.signOutUser(signInId);
          signinTimeLine.signUserOut(user);
          this.currentCapacity--;
          return new Result(200, "Success");
        } catch (InterruptedException e) {
          return new Result(500, "Unable to write to database to sign user out");
        }
      } else {
        return new Result(405, "User is not signed in to be signed out");
      }
    } else {
      return new Result(404, "User does not exist");
    }
  }

  public Result createAndSigninUser(final NewUserRequestModel newUserRequestModel) {
    final UserRequestModel user = newUserRequestModel.getUser();
    if (users.contains(user)) {
      return new Result(405, "Email " + user.getEmail() + " already exists!");
    } else {
      signinTimeLine.addUser(user);
      users.add(user);
      try {
        databaseManager.addUser(newUserRequestModel);
      } catch (InterruptedException e) {
        final String errorMessage = "Unable to write new user to database: " + e.toString();
        logger.warn(errorMessage);
        return new Result(500, errorMessage);
      }
      // Sign user in after creating them
      final SigninRequestModel signinRequestModel =
          new SigninRequestModel(
              newUserRequestModel.getSigninData(), newUserRequestModel.getUser());
      return this.signinUser(signinRequestModel);
    }
  }

  public Result userExists(final UserRequestModel user) {
    return new UserExistsResult(200, "", users.contains(user));
  }

  public void setMaxCapacity(final int newMax) {
    this.maxCapacity = newMax;
  }
}
