package org.nctrc.backend.startup.entrypoint;

import com.google.inject.Inject;
import io.javalin.Javalin;
import java.util.Collections;
import java.util.Set;
import org.nctrc.backend.routers.Routing;

public class WebEntrypoint implements AppEntrypoint {
  private final Javalin javalin;

  @Inject(optional = true)
  private Set<Routing> routes = Collections.emptySet();

  @Inject
  public WebEntrypoint(final Javalin javalin) {
    this.javalin = javalin;
  }

  @Override
  public void boot(String[] args) {
    bindRoutes();
    javalin.start();
  }

  private void bindRoutes() {
    routes.forEach(Routing::bindRoutes);
  }
}
