package org.nctrc.backend.modules;

import com.google.inject.AbstractModule;
import org.nctrc.backend.controllers.UserSigninController;

public class NCTRCModule extends AbstractModule {

  @Override
  protected void configure() {
    bind(UserSigninController.class);
    install(WebModule.create());
  }
}
