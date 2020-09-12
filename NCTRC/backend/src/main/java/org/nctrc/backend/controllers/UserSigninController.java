package org.nctrc.backend.controllers;

import io.javalin.http.Context;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.managers.UsersManagerImpl;
import org.nctrc.backend.model.Result;

@Singleton
public class UserSigninController {

  private UsersManagerImpl manager;

  private HandleResultController handleResultController;

  @Inject
  public UserSigninController(
      final UsersManagerImpl manager, final HandleResultController handleResultController) {
    this.manager = manager;
    this.handleResultController = handleResultController;
  }

  public void login(final Context ctx) {
    final Result result = manager.signinUser(ctx);
    if (handleResultController.resultIsIn2xxAndHandle(result, ctx)) {
      ctx.json(result);
    }
  }
}
