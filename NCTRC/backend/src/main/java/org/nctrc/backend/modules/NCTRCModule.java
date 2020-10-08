package org.nctrc.backend.modules;

import com.google.inject.AbstractModule;
import org.nctrc.backend.controllers.UserCreationController;
import org.nctrc.backend.controllers.UserSigninController;
import org.nctrc.backend.controllers.UserStatusController;
import org.nctrc.backend.managers.UsersManager;

public class NCTRCModule extends AbstractModule {

  @Override
  protected void configure() {
    bind(UsersManager.class);
    bind(UserSigninController.class);
    bind(UserCreationController.class);
    bind(UserStatusController.class);
    install(WebModule.create());
  }
}
