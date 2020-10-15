package org.nctrc.backend.controllers;

import io.javalin.http.Context;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.model.response.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class Controller {

  static final String ROOT_PATH = Constants.MAIN_PATH;

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

  /**
   * This function attempts to turn the request into the given object, and on failure sends a 400
   * bad request
   *
   * @param context The context (aka request) object to validate
   * @param type The class to validate it as
   * @param <T> Generic holding the class to be validated as
   * @return Returns the context's body as the given class, or null if it can not be parsed
   */
  <T> T validateBody(final Context context, final Class<T> type) {
    try {
      final T validatedBody = context.bodyAsClass(type);
      return validatedBody;
    } catch (Exception e) {
      final Result failedResult =
          new Result(400, "Can't process body as " + type.getName() + ":\n" + e.toString());
      context.status(failedResult.getStatusCode());
      context.json(failedResult);
      return null;
    }
  }
}
