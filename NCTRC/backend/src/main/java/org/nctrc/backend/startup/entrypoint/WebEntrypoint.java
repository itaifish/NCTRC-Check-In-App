package org.nctrc.backend.startup.entrypoint;

import static io.javalin.apibuilder.ApiBuilder.delete;
import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;

import com.google.inject.Inject;
import io.javalin.Javalin;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.controllers.AdminController;
import org.nctrc.backend.controllers.UserCreationController;
import org.nctrc.backend.controllers.UserSigninController;
import org.nctrc.backend.controllers.UserStatusController;

public class WebEntrypoint implements AppEntrypoint {

  private final Javalin javalin;

  private final UserSigninController userSigninController;

  private final UserCreationController userCreationController;

  private final UserStatusController userStatusController;

  private final AdminController adminController;

  @Inject
  public WebEntrypoint(
      final Javalin javalin,
      final UserSigninController userSigninController,
      final UserCreationController userCreationController,
      final UserStatusController userStatusController,
      final AdminController adminController) {
    this.javalin = javalin;
    this.userSigninController = userSigninController;
    this.userCreationController = userCreationController;
    this.userStatusController = userStatusController;
    this.adminController = adminController;
  }

  @Override
  public void boot(String[] args) {
    javalin
        .routes(
            () -> {
              path(
                  Constants.MAIN_PATH,
                  () -> {
                    path(
                        Constants.USER_PATH,
                        () -> {
                          path(
                              Constants.USER_SIGNIN_PATH,
                              () -> post(this.userSigninController::login));
                          path(
                              Constants.USER_CREATION_PATH,
                              () -> post(this.userCreationController::createUser));
                          path(
                              Constants.USER_DELETION_PATH,
                              () -> delete(this.userCreationController::deleteUser));
                          path(
                              Constants.USER_SIGNOUT_PATH,
                              () -> post(this.userSigninController::logout));
                          path(
                              Constants.USER_EXISTS_PATH,
                              () -> post(this.userStatusController::doesUserExist));
                        });
                    path(
                        Constants.ADMIN_PATH,
                        () -> {
                          path(
                              Constants.ADMIN_UPDATE_CAPACITY_PATH,
                              () -> post(this.adminController::updateMaxCapacity));
                        });
                  });
            })
        .start();
  }
}
