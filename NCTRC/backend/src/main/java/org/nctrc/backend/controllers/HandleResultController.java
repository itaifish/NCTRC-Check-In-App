package org.nctrc.backend.controllers;

import io.javalin.http.Context;
import javax.inject.Singleton;
import org.nctrc.backend.model.Result;

@Singleton
public class HandleResultController {

  /**
   * This function checks if a result is a 200-level result: -If yes, return true and do nothing -If
   * no, handle (respond to client) the result and return false
   *
   * @param result Result to check
   * @param context Context to use to respond to client
   * @return Whether or not result is in 200 range
   */
  public boolean resultIsIn2xxAndHandle(final Result result, final Context context) {
    if (result.getStatusCode() >= 200 && result.getStatusCode() < 300) {
      return true;
    } else {
      context.status(result.getStatusCode());
      context.json(result);
      return false;
    }
  }
}
