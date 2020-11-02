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
import org.nctrc.backend.model.request.UserRequestModel;
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
            status = "404",
            content = {@OpenApiContent(from = Result.class)}),
        @OpenApiResponse(
            status = "405",
            content = {@OpenApiContent(from = Result.class)}),
        @OpenApiResponse(
            status = "409",
            content = {@OpenApiContent(from = Result.class)}),
        @OpenApiResponse(
            status = "412",
            content = {@OpenApiContent(from = Result.class)}),
      })
  public void createUser(final Context ctx) {
    final NewUserRequestModel userModel = validateBodyAndAuth(ctx, NewUserRequestModel.class);
    if (userModel == null) {
      return;
    }
    final Result result = manager.createAndSigninUser(userModel);
    if (this.resultIsIn2xxAndHandle(result, ctx)) {
      ctx.status(201);
    }
  }

  @OpenApi(
      summary = "Delete user",
      operationId = "deleteUser",
      path = "/" + ROOT_PATH + Constants.USER_DELETION_PATH,
      method = HttpMethod.DELETE,
      tags = {"User"},
      requestBody = @OpenApiRequestBody(content = {@OpenApiContent(from = UserRequestModel.class)}),
      responses = {
        @OpenApiResponse(status = "200"),
        @OpenApiResponse(
            status = "405",
            content = {@OpenApiContent(from = Result.class)}),
      })
  public void deleteUser(final Context ctx) {
    final UserRequestModel userModel = validateBodyAndAuth(ctx, UserRequestModel.class);
    if (userModel == null) {
      return;
    }
    final Result result = manager.deleteUser(userModel);
    if (this.resultIsIn2xxAndHandle(result, ctx)) {
      ctx.status(200);
    }
  }
}
