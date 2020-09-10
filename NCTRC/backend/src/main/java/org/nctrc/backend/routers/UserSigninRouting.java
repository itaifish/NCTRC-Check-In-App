package org.nctrc.backend.routers;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;

import io.javalin.Javalin;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.controllers.UserSigninController;

@Singleton
public class UserSigninRouting extends Routing<UserSigninController> {

  private Javalin javalin;

  @Inject
  public UserSigninRouting(final Javalin javalin) {
    this.javalin = javalin;
  }

  @Override
  public void bindRoutes() {
    javalin.routes(
        () -> {
          path(
              Constants.MAIN_PATH + Constants.USER_SIGNIN_PATH,
              () -> get(context -> getController().login(context)));
        });
  }
}
