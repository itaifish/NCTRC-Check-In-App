package org.nctrc.backend.managers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.AttributeUpdate;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.GetItemSpec;
import com.amazonaws.services.dynamodbv2.document.spec.UpdateItemSpec;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Properties;
import java.util.Set;
import java.util.UUID;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.config.DatabaseConfigInformation;
import org.nctrc.backend.config.DatabaseConstants;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;
import org.nctrc.backend.utility.Utility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class DatabaseManager implements DatabaseManagerInterface {

  private static final Logger logger = LoggerFactory.getLogger(DatabaseManager.class);

  private final DynamoDB database;

  private final DatabaseConstants databaseConstants;

  private final Set<String> tablesThatExist;

  @Inject
  public DatabaseManager(final DatabaseConstants databaseConstants) {
    this.databaseConstants = databaseConstants;
    this.tablesThatExist = new HashSet<>();
    try (InputStream input =
        Objects.requireNonNull(
                DatabaseManager.class
                    .getClassLoader()
                    .getResource("keystore/database/database.properties"))
            .openStream()) {
      final Properties prop = new Properties();
      prop.load(input);
      System.setProperty("aws.accessKeyId", prop.getProperty("accessKeyId"));
      System.setProperty("aws.secretKey", prop.getProperty("secretAccessKey"));
    } catch (IOException | NullPointerException ex) {
      ex.printStackTrace();
    }
    final AmazonDynamoDB client =
        AmazonDynamoDBClientBuilder.standard().withRegion(Constants.REGION).build();
    this.database = new DynamoDB(client);
  }

  public void addUser(final NewUserRequestModel userRequestModel) throws InterruptedException {
    this.createTableIfNotExist(this.databaseConstants.USERS_TABLE);
    final Table usersTable = this.database.getTable(this.databaseConstants.USERS_TABLE);
    usersTable.waitForActive();
    final Item newUserItem = new Item();
    newUserItem.withPrimaryKey("email", userRequestModel.getUser().getEmail());
    Constants.ISO_8601.setTimeZone(Constants.TIME_ZONE);
    newUserItem.with("createDate", Constants.ISO_8601.format(new Date()));
    newUserItem.with("firstName", userRequestModel.getUser().getFirstName());
    newUserItem.with("lastName", userRequestModel.getUser().getLastName());
    newUserItem.with("signature", userRequestModel.getSignature());
    try {
      final PutItemOutcome outcome = usersTable.putItem(newUserItem);
      logger.debug("New User inserted into database:\n" + outcome.getPutItemResult());
    } catch (Exception e) {
      logger.error("Unable to add new user with error: " + e.toString());
    }
  }

  /**
   * This function signs in a user and returns the uuid of the signin/signout datapoint
   *
   * @param signinRequestModel Model of request to sign a user in
   * @return String of uuid for signin/signout to be found later
   * @throws InterruptedException
   */
  public String signinUser(final SigninRequestModel signinRequestModel)
      throws InterruptedException {
    this.createTableIfNotExist(this.databaseConstants.TIMELINE_TABLE);
    final Table timelineTable = this.database.getTable(this.databaseConstants.TIMELINE_TABLE);
    timelineTable.waitForActive();
    final Item newTimelineItem = new Item();
    final String id = UUID.randomUUID().toString();
    newTimelineItem.withPrimaryKey("id", id);
    newTimelineItem.with("userEmail", signinRequestModel.getUser().getEmail());
    newTimelineItem.with("firstName", signinRequestModel.getUser().getFirstName());
    newTimelineItem.with("lastName", signinRequestModel.getUser().getLastName());
    newTimelineItem.with("signinTime", Utility.nowToFullIso8601String());
    newTimelineItem.with("temperature", signinRequestModel.getSigninData().getTemperature());
    if (signinRequestModel.getSigninData().getYesQuestion() != null) {
      newTimelineItem.withPrimaryKey(
          "yesQuestion", signinRequestModel.getSigninData().getYesQuestion());
    }
    try {
      final PutItemOutcome outcome = timelineTable.putItem(newTimelineItem);
      logger.debug("New User inserted into database:\n" + outcome.getPutItemResult());
    } catch (Exception e) {
      logger.error("Unable to add new user with error: " + e.toString());
      throw new InterruptedException("Unable to add new user with error: " + e.toString());
    }
    return id;
  }

  public void signOutUser(final String uuid) throws InterruptedException {
    signOutUser(uuid, Utility.nowToFullIso8601String());
  }

  public void signOutUser(final String uuid, final String signoutTime) throws InterruptedException {
    final Table timelineTable = this.database.getTable(this.databaseConstants.TIMELINE_TABLE);
    timelineTable.waitForActive();
    timelineTable.updateItem(
        new UpdateItemSpec()
            .withPrimaryKey("id", uuid)
            .withAttributeUpdate(new AttributeUpdate("signoutTime").put(signoutTime)));
  }

  public int loadMaxCapacity() throws InterruptedException {
    createTableIfNotExist(this.databaseConstants.CONFIG_TABLE);
    final Table configTable = this.database.getTable(this.databaseConstants.CONFIG_TABLE);
    configTable.waitForActive();
    final Item maxCapacityItem =
        configTable.getItem(
            new GetItemSpec()
                .withPrimaryKey(
                    this.databaseConstants.CONFIG_PRIMARY_KEY,
                    this.databaseConstants.CONFIG_MAX_CAPACITY));
    return maxCapacityItem.getInt(this.databaseConstants.CONFIG_VALUE);
  }

  public void setMaxCapacity(final int newMaxCapacity) throws InterruptedException {
    createTableIfNotExist(this.databaseConstants.CONFIG_TABLE);
    final Table configTable = this.database.getTable(this.databaseConstants.CONFIG_TABLE);
    configTable.waitForActive();
    configTable.updateItem(
        new UpdateItemSpec()
            .withPrimaryKey(
                this.databaseConstants.CONFIG_PRIMARY_KEY,
                this.databaseConstants.CONFIG_MAX_CAPACITY)
            .withAttributeUpdate(
                new AttributeUpdate(this.databaseConstants.CONFIG_VALUE).put(newMaxCapacity)));
  }

  @Override
  public List<UserRequestModel> getAllUsers() throws InterruptedException {
    final List<UserRequestModel> users = new ArrayList<>();
    createTableIfNotExist(this.databaseConstants.USERS_TABLE);
    final Table usersTable = this.database.getTable(this.databaseConstants.USERS_TABLE);
    usersTable.waitForActive();
    final ItemCollection<ScanOutcome> outcomeItemCollection = usersTable.scan();
    outcomeItemCollection.forEach(
        item -> {
          users.add(
              new UserRequestModel(
                  item.get("firstName").toString(),
                  item.get("lastName").toString(),
                  item.get("email").toString()));
        });
    return users;
  }

  private void createTableIfNotExist(final String tableName) {
    if (this.tablesThatExist.contains(tableName)) {
      return;
    }
    final DatabaseConfigInformation configInformation =
        databaseConstants.TABLE_CONFIG.get(tableName);
    if (configInformation == null) {
      logger.error("Can't resolve table name: " + tableName);
      return;
    }
    try {
      final Table table =
          this.database.createTable(
              configInformation.getTableName(),
              configInformation.getKeySchemaElements(),
              configInformation.getAttributeDefinitions(),
              databaseConstants.PROVISIONED_THROUGHPUT);
      table.waitForActive();
      if (tableName.equals(databaseConstants.CONFIG_TABLE)) {
        table.putItem(
            new Item()
                .withPrimaryKey(
                    this.databaseConstants.CONFIG_PRIMARY_KEY,
                    this.databaseConstants.CONFIG_MAX_CAPACITY)
                .with(this.databaseConstants.CONFIG_VALUE, databaseConstants.DEFAULT_MAX_CAPACITY));
      }
      this.tablesThatExist.add(tableName);
      logger.debug("Create new table " + tableName);
    } catch (ResourceInUseException e) {
      this.tablesThatExist.add(tableName);
      logger.debug("Not Creating new table " + tableName + " - it already exists");
    } catch (InterruptedException e) {
      logger.error("Unable to create table " + tableName + ": " + e.toString());
    }
  }
}
