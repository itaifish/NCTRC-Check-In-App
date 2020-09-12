package org.nctrc.backend.modules;

import com.google.inject.AbstractModule;
import com.google.inject.multibindings.MapBinder;
import io.javalin.Javalin;
import org.eclipse.jetty.server.Server;
import org.jetbrains.annotations.NotNull;
import org.nctrc.backend.startup.entrypoint.AppEntrypoint;
import org.nctrc.backend.startup.entrypoint.EntrypointType;
import org.nctrc.backend.startup.entrypoint.WebEntrypoint;

public class WebModule extends AbstractModule {
  private final Javalin javalin;

  private WebModule(Javalin javalin) {
    this.javalin = javalin;
  }

  @NotNull
  public static WebModule create() {
    return new WebModule(
        Javalin.create(
            javalinConfig -> {
              javalinConfig.enforceSsl = true;
              javalinConfig.enableDevLogging();
              javalinConfig.server(
                  () -> {
                    final Server server = new Server();
                    // ssl cert stuff here
                    return server;
                  });
            }));
  }

  @Override
  protected void configure() {
    bind(Javalin.class).toInstance(javalin);
    MapBinder.newMapBinder(binder(), EntrypointType.class, AppEntrypoint.class)
        .addBinding(EntrypointType.REST)
        .to(WebEntrypoint.class);
  }
}
