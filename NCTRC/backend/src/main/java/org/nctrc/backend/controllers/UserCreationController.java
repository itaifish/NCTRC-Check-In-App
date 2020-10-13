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
import org.nctrc.backend.managers.UsersManager;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.response.Result;

@Singleton
public class UserCreationController extends UserController {

  private final UsersManager manager;

  @Inject
  public UserCreationController(final UsersManager manager) {
    this.manager = manager;
  }

  @OpenApi(
      summary = "Create user",
      operationId = "createUser",
      path = "/" + ROOT_PATH + Constants.USER_CREATION_PATH,
      method = HttpMethod.POST,
      tags = {"User"},
      requestBody =
          @OpenApiRequestBody(content = {@OpenApiContent(from = NewUserRequestModel.class)}),
      responses = {
        @OpenApiResponse(status = "201"),
        @OpenApiResponse(
            status = "400",
            content = {@OpenApiContent(from = Result.class)}),
        @OpenApiResponse(
            status = "405",
            content = {@OpenApiContent(from = Result.class)})
      })
  public void createUser(final Context ctx) {
    final NewUserRequestModel userModel = validateBody(ctx, NewUserRequestModel.class);
    if (userModel == null) {
      return;
    }
    final Result result = manager.addUser(userModel);
    if (this.resultIsIn2xxAndHandle(result, ctx)) {
      ctx.status(201);
    }
  }
}
