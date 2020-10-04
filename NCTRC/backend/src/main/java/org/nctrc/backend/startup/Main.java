package org.nctrc.backend.startup;

import com.google.inject.Guice;
import com.google.inject.Injector;
import org.nctrc.backend.modules.MainModule;
import org.nctrc.backend.startup.entrypoint.EntrypointType;

public class Main {

  public static void main(String[] args) {
    final Injector injector = Guice.createInjector(new MainModule());
    injector.getInstance(Startup.class).boot(EntrypointType.REST, args);
  }
}
