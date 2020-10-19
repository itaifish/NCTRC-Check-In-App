package org.nctrc.backend.controllers;

import io.javalin.http.Context;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import java.util.Properties;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.model.response.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class Controller {

  static final String ROOT_PATH = Constants.MAIN_PATH;

  private static final Logger logger = LoggerFactory.getLogger(Controller.class);

  private static final String authKey = loadAuthKey();

  /**
   * This function checks if a result is a 200-level result: -If yes, return true and do nothing -If
   * no, handle (respond to client) the result and return false
   *
   * @param result Result to check
   * @param context Context to use to respond to client
   * @return Whether or not result is in 200 range
   */
  boolean resultIsIn2xxAndHandle(final Result result, final Context context) {
    final Logger logger = LoggerFactory.getLogger(this.getClass());
    logger.info("Received Result " + result.toString() + " from context " + context.toString());
    if (result.getStatusCode() >= 200 && result.getStatusCode() < 300) {
      return true;
    } else {
      context.status(result.getStatusCode());
      context.json(result);
      return false;
    }
  }

  boolean isCorrectAuth(final Context context) {
    assert authKey != null;
    return authKey.equals(context.header("auth"));
  }

  private static String loadAuthKey() {
    try (InputStream input =
        Objects.requireNonNull(
                Controller.class.getClassLoader().getResource("keystore/auth.properties"))
            .openStream()) {
      final Properties prop = new Properties();
      prop.load(input);
      return prop.getProperty("authKey");
    } catch (IOException | NullPointerException ex) {
      logger.error("Unable to load auth key: " + ex.toString());
    }
    return null;
  }

  /**
   * This function attempts to turn the request into the given object, and on failure sends a 400
   * bad request
   *
   * @param context The context (aka request) object to validate
   * @param type The class to validate it as
   * @param <T> Generic holding the class to be validated as
   * @return Returns the context's body as the given class, or null if it can not be parsed
   */
  <T> T validateBodyAndAuth(final Context context, final Class<T> type) {
    try {
      final T validatedBody = context.bodyAsClass(type);
      if (isCorrectAuth(context)) {
        return validatedBody;
      } else {
        final Result failedResult = new Result(401, "Unauthorized");
        context.status(failedResult.getStatusCode());
        context.json(failedResult);
        return null;
      }
    } catch (Exception e) {
      final Result failedResult =
          new Result(400, "Can't process body as " + type.getName() + ":\n" + e.toString());
      context.status(failedResult.getStatusCode());
      context.json(failedResult);
      return null;
    }
  }
}
