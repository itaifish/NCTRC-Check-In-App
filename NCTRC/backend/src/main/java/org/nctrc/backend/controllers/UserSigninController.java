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
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;
import org.nctrc.backend.model.response.Result;

@Singleton
public class UserSigninController extends UserController {

  private final UsersManager manager;

  @Inject
  public UserSigninController(final UsersManager manager) {
    this.manager = manager;
  }

  @OpenApi(
      summary = "Login existing user",
      operationId = "loginUser",
      path = "/" + ROOT_PATH + Constants.USER_SIGNIN_PATH,
      method = HttpMethod.POST,
      tags = {"User"},
      requestBody =
          @OpenApiRequestBody(content = {@OpenApiContent(from = SigninRequestModel.class)}),
      responses = {
        @OpenApiResponse(status = "200"),
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
  public void login(final Context ctx) {
    final SigninRequestModel userModel = validateBody(ctx, SigninRequestModel.class);
    if (userModel == null) {
      return;
    }
    final Result result = manager.signinUser(userModel);
    if (this.resultIsIn2xxAndHandle(result, ctx)) {
      ctx.status(200);
    }
  }

  @OpenApi(
      summary = "Log out existing user",
      operationId = "logoutUser",
      path = "/" + ROOT_PATH + Constants.USER_SIGNOUT_PATH,
      method = HttpMethod.POST,
      tags = {"User"},
      requestBody = @OpenApiRequestBody(content = {@OpenApiContent(from = UserRequestModel.class)}),
      responses = {
        @OpenApiResponse(status = "200"),
        @OpenApiResponse(
            status = "400",
            content = {@OpenApiContent(from = Result.class)}),
        @OpenApiResponse(
            status = "404",
            content = {@OpenApiContent(from = Result.class)}),
        @OpenApiResponse(
            status = "405",
            content = {@OpenApiContent(from = Result.class)})
      })
  public void logout(final Context ctx) {
    final UserRequestModel userModel = validateBody(ctx, UserRequestModel.class);
    if (userModel == null) {
      return;
    }
    final Result result = manager.signoutUser(userModel);
    if (this.resultIsIn2xxAndHandle(result, ctx)) {
      ctx.status(200);
    }
  }
}
