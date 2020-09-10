package org.nctrc.backend.controllers;

import io.javalin.Context;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.managers.UsersManagerImpl;

@Singleton
public class UserSigninController {

  private UsersManagerImpl manager;

  @Inject
  public UserSigninController(final UsersManagerImpl manager) {
    this.manager = manager;
  }

  public void login(final Context ctx) {
    ctx.json(manager.signinUser());
  }
}
