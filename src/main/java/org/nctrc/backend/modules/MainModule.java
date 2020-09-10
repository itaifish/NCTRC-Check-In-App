package org.nctrc.backend.modules;

import com.google.inject.AbstractModule;
import org.nctrc.backend.services.TestService;

public class MainModule extends AbstractModule {
  @Override
  protected void configure() {
    bind(TestService.class).toInstance(new TestService());
  }
}
