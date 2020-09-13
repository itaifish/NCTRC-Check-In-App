package org.nctrc.backend.controllers;

import io.javalin.http.Context;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.managers.UsersManagerImpl;
import org.nctrc.backend.model.Result;

@Singleton
public class UserSigninController extends Controller {

  private UsersManagerImpl manager;

  @Inject
  public UserSigninController(final UsersManagerImpl manager) {
    this.manager = manager;
  }

  public void login(final Context ctx) {
    final Result result = manager.signinUser(ctx);
    if (this.resultIsIn2xxAndHandle(result, ctx)) {
      ctx.json(result);
    }
  }
}
