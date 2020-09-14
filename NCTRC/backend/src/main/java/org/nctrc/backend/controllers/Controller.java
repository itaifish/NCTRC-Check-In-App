package org.nctrc.backend.controllers;

import io.javalin.http.Context;
import org.nctrc.backend.model.response.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class Controller {

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
}
