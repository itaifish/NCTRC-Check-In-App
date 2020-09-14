package org.nctrc.backend.controllers;

import io.javalin.http.Context;
import io.javalin.plugin.openapi.annotations.HttpMethod;
import io.javalin.plugin.openapi.annotations.OpenApi;
import io.javalin.plugin.openapi.annotations.OpenApiContent;
import io.javalin.plugin.openapi.annotations.OpenApiRequestBody;
import io.javalin.plugin.openapi.annotations.OpenApiResponse;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.managers.UsersManagerImpl;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.model.response.User;

@Singleton
public class UserSigninController extends Controller {

  private UsersManagerImpl manager;

  @Inject
  public UserSigninController(final UsersManagerImpl manager) {
    this.manager = manager;
  }

  @OpenApi(
      summary = "Login existing user",
      operationId = "loginUser",
      path = Constants.USER_SIGNIN_PATH,
      method = HttpMethod.POST,
      tags = {"User"},
      requestBody = @OpenApiRequestBody(content = {@OpenApiContent(from = User.class)}),
      responses = {
        @OpenApiResponse(status = "201"),
        @OpenApiResponse(
            status = "400",
            content = {@OpenApiContent(from = Result.class)})
      })
  public void login(final Context ctx) {
    final Result result = manager.signinUser(ctx.bodyAsClass(User.class));
    if (this.resultIsIn2xxAndHandle(result, ctx)) {
      ctx.status(201);
    }
  }
}
