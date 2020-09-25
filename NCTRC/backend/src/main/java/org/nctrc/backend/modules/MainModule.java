package org.nctrc.backend.modules;

import com.google.inject.AbstractModule;
import org.nctrc.backend.startup.Startup;

public class MainModule extends AbstractModule {
  @Override
  protected void configure() {
    bind(Startup.class);
    install(new NCTRCModule());
  }
}
