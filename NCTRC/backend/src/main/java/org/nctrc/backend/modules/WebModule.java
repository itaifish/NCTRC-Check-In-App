package org.nctrc.backend.modules;

import com.google.inject.AbstractModule;
import com.google.inject.multibindings.MapBinder;
import io.javalin.Javalin;
import io.javalin.plugin.openapi.OpenApiOptions;
import io.javalin.plugin.openapi.OpenApiPlugin;
import io.javalin.plugin.openapi.ui.ReDocOptions;
import io.javalin.plugin.openapi.ui.SwaggerOptions;
import io.swagger.v3.oas.models.info.Info;
import java.io.FileNotFoundException;
import java.net.URL;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.util.ssl.SslContextFactory;
import org.jetbrains.annotations.NotNull;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.startup.entrypoint.AppEntrypoint;
import org.nctrc.backend.startup.entrypoint.EntrypointType;
import org.nctrc.backend.startup.entrypoint.WebEntrypoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WebModule extends AbstractModule {

  private final Javalin javalin;

  private static final Logger logger = LoggerFactory.getLogger(WebModule.class);

  private WebModule(Javalin javalin) {
    this.javalin = javalin;
  }

  @NotNull
  public static WebModule create() {
    return new WebModule(
        Javalin.create(
            javalinConfig -> {
              javalinConfig.enforceSsl = true;
              javalinConfig.defaultContentType = Constants.DEFAULT_CONFIG_TYPE;
              javalinConfig.enableDevLogging();
              javalinConfig.registerPlugin(getConfiguredOpenApiPlugin());
              javalinConfig.server(
                  () -> {
                    final Server server = new Server();
                    try {
                      final ServerConnector sslConnector =
                          new ServerConnector(server, getSslContextFactory());
                      sslConnector.setPort(443);
                      server.addConnector(sslConnector);
                    } catch (FileNotFoundException e) {
                      logger.warn("Error with setting up SSL server: " + e.getMessage());
                    } finally {
                      final ServerConnector httpConnector = new ServerConnector(server);
                      httpConnector.setPort(Constants.PORT);
                      server.addConnector(httpConnector);
                    }
                    return server;
                  });
            }));
  }

  private static SslContextFactory getSslContextFactory() throws FileNotFoundException {
    final SslContextFactory sslContextFactory = new SslContextFactory.Server();
    final URL keystorePath = WebModule.class.getResource("/keystore/keystore.jks");
    if (keystorePath == null) {
      throw new FileNotFoundException("Can't find keystore.jsk file");
    }
    sslContextFactory.setKeyStorePath(keystorePath.toExternalForm());
    sslContextFactory.setKeyStorePassword("password");
    return sslContextFactory;
  }

  @Override
  protected void configure() {
    bind(Javalin.class).toInstance(javalin);
    MapBinder.newMapBinder(binder(), EntrypointType.class, AppEntrypoint.class)
        .addBinding(EntrypointType.REST)
        .to(WebEntrypoint.class);
  }

  private static OpenApiPlugin getConfiguredOpenApiPlugin() {
    Info info =
        new Info()
            .version(Constants.VERSION)
            .title(Constants.TITLE)
            .description(Constants.DESCRIPTION);
    OpenApiOptions options =
        new OpenApiOptions(info)
            .activateAnnotationScanningFor("org.nctrc.backend")
            .path("/swagger-docs") // endpoint for OpenAPI json
            .swagger(new SwaggerOptions("/swagger-ui")) // endpoint for swagger-ui
            .reDoc(new ReDocOptions("/redoc")) // endpoint for redoc
            .defaultDocumentation(
                doc -> {
                  doc.json("500", Result.class);
                  doc.json("503", Result.class);
                });
    return new OpenApiPlugin(options);
  }
}
