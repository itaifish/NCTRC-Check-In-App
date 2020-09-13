package org.nctrc.backend.modules;

import com.google.inject.AbstractModule;
import com.google.inject.multibindings.Multibinder;
import org.nctrc.backend.controllers.UserSigninController;
import org.nctrc.backend.routers.Routing;
import org.nctrc.backend.routers.UserSigninRouting;

public class NCTRCModule extends AbstractModule {

  @Override
  protected void configure() {
    bind(UserSigninController.class);
    Multibinder.newSetBinder(binder(), Routing.class).addBinding().to(UserSigninRouting.class);
    install(WebModule.create());
  }
}
