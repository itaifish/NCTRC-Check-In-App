package org.nctrc.backend.controllers;

import io.javalin.http.Context;
import io.javalin.plugin.openapi.annotations.HttpMethod;
import io.javalin.plugin.openapi.annotations.OpenApi;
import io.javalin.plugin.openapi.annotations.OpenApiContent;
import io.javalin.plugin.openapi.annotations.OpenApiRequestBody;
import io.javalin.plugin.openapi.annotations.OpenApiResponse;
import java.util.ArrayList;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.managers.DatabaseManagerInterface;
import org.nctrc.backend.managers.UsersManager;
import org.nctrc.backend.model.request.UpdateMaxCapacityRequestModel;
import org.nctrc.backend.model.response.Result;
import org.nctrc.backend.model.response.UserListResponse;

@Singleton
public class AdminController extends Controller {

  private final DatabaseManagerInterface databaseManager;

  private final UsersManager usersManager;

  @Inject
  public AdminController(
      final DatabaseManagerInterface databaseManager, final UsersManager usersManager) {
    this.databaseManager = databaseManager;
    this.usersManager = usersManager;
  }

  @OpenApi(
      summary = "Set Max Capacity",
      operationId = "setCapacity",
      path = "/" + ROOT_PATH + Constants.ADMIN_PATH + Constants.ADMIN_UPDATE_CAPACITY_PATH,
      method = HttpMethod.POST,
      tags = {"Admin"},
      requestBody =
          @OpenApiRequestBody(
              content = {@OpenApiContent(from = UpdateMaxCapacityRequestModel.class)}),
      responses = {
        @OpenApiResponse(status = "200"),
        @OpenApiResponse(
            status = "400",
            content = {@OpenApiContent(from = Result.class)}),
      })
  public void updateMaxCapacity(final Context ctx) {
    final UpdateMaxCapacityRequestModel updateMaxCapacityRequestModel =
        validateBodyAndAuth(ctx, UpdateMaxCapacityRequestModel.class);
    if (updateMaxCapacityRequestModel == null) {
      return;
    }
    if (updateMaxCapacityRequestModel.getMaxCapacity() < 1) {
      ctx.status(400);
      ctx.json(new Result(400, "Max capacity must be at least 1"));
      return;
    }
    try {
      databaseManager.setMaxCapacity(updateMaxCapacityRequestModel.getMaxCapacity());
      usersManager.setMaxCapacity(updateMaxCapacityRequestModel.getMaxCapacity());
    } catch (java.lang.InterruptedException e) {
      ctx.status(500);
      ctx.json(new Result(500, "Was unable to write to database"));
    }
  }

  @OpenApi(
      summary = "Get Logged In Users",
      operationId = "getLoggedIn",
      path = "/" + ROOT_PATH + Constants.ADMIN_PATH + Constants.ADMIN_LOGGED_IN_PATH,
      method = HttpMethod.POST,
      tags = {"Admin"},
      responses = {
        @OpenApiResponse(
            status = "200",
            content = {@OpenApiContent(from = UserListResponse.class)}),
      })
  public void getLoggedInUsers(final Context ctx) {
    if (this.isCorrectAuth(ctx)) {
      try {
        ctx.status(200);
        ctx.json(
            new UserListResponse(
                new ArrayList<>(databaseManager.getAllUsersWhoAreSignedInDatabase().keySet())));
      } catch (InterruptedException e) {
        ctx.status(500);
        ctx.json(new Result(500, "Was unable to write to database"));
      }
    } else {
      final Result failedResult = new Result(401, "Unauthorized");
      ctx.status(failedResult.getStatusCode());
      ctx.json(failedResult);
    }
  }

  @OpenApi(
      summary = "Get All Users",
      operationId = "getUsers",
      path = "/" + ROOT_PATH + Constants.ADMIN_PATH + Constants.ADMIN_USERS_PATH,
      method = HttpMethod.POST,
      tags = {"Admin"},
      responses = {
        @OpenApiResponse(
            status = "200",
            content = {@OpenApiContent(from = UserListResponse.class)}),
      })
  public void getAllUsers(final Context ctx) {
    if (this.isCorrectAuth(ctx)) {
      try {
        ctx.status(200);
        ctx.json(new UserListResponse(databaseManager.getAllUsers()));
      } catch (InterruptedException e) {
        ctx.status(500);
        ctx.json(new Result(500, "Was unable to write to database"));
      }
    } else {
      final Result failedResult = new Result(401, "Unauthorized");
      ctx.status(failedResult.getStatusCode());
      ctx.json(failedResult);
    }
  }
}
