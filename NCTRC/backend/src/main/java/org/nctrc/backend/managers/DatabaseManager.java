package org.nctrc.backend.managers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.AttributeUpdate;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.dynamodbv2.document.KeyAttribute;
import com.amazonaws.services.dynamodbv2.document.PrimaryKey;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.QueryOutcome;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.GetItemSpec;
import com.amazonaws.services.dynamodbv2.document.spec.UpdateItemSpec;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Properties;
import java.util.Set;
import java.util.UUID;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.config.DatabaseConfigInformation;
import org.nctrc.backend.config.DatabaseConstants;
import org.nctrc.backend.model.internal.SigninEmailIdPair;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninDataRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;
import org.nctrc.backend.model.response.TimelineInstance;
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

  public void removeUser(final UserRequestModel userRequestModel) throws InterruptedException {
    this.createTableIfNotExist(this.databaseConstants.USERS_TABLE);
    final Table usersTable = this.database.getTable(this.databaseConstants.USERS_TABLE);
    usersTable.waitForActive();
    usersTable.deleteItem(new PrimaryKey("email", userRequestModel.getEmail()));
    this.createTableIfNotExist(this.databaseConstants.TIMELINE_TABLE);
    final Table timelineTable = this.database.getTable(this.databaseConstants.TIMELINE_TABLE);
    timelineTable.waitForActive();
    final ItemCollection<QueryOutcome> outcomeItemCollection =
        timelineTable.query(new KeyAttribute("userEmail", userRequestModel.getEmail()));
    outcomeItemCollection.forEach(
        item -> {
          timelineTable.deleteItem(
              new PrimaryKey("userEmail", item.getString("userEmail"), "id", item.getString("id")));
        });
    final Table signedInTable = this.database.getTable(this.databaseConstants.SIGNED_IN_TABLE);
    signedInTable.waitForActive();
    signedInTable.deleteItem(new PrimaryKey("email", userRequestModel.getEmail()));
  }

  /**
   * This function signs in a user and returns the uuid of the signin/signout datapoint
   *
   * @param signinRequestModel Model of request to sign a user in
   * @return String of uuid for signin/signout to be found later
   * @throws InterruptedException
   */
  public SigninEmailIdPair signinUser(final SigninRequestModel signinRequestModel)
      throws InterruptedException {
    this.createTableIfNotExist(this.databaseConstants.TIMELINE_TABLE);
    this.createTableIfNotExist(this.databaseConstants.SIGNED_IN_TABLE);
    final Table timelineTable = this.database.getTable(this.databaseConstants.TIMELINE_TABLE);
    timelineTable.waitForActive();
    final Table signedInTable = this.database.getTable(this.databaseConstants.SIGNED_IN_TABLE);
    signedInTable.waitForActive();
    // Sign in user to timeline table
    final Item newTimelineItem = new Item();
    final String id = UUID.randomUUID().toString();
    final String email = signinRequestModel.getUser().getEmail();
    final String firstName = signinRequestModel.getUser().getFirstName();
    final String lastName = signinRequestModel.getUser().getLastName();
    final String signinTime = Utility.nowToFullIso8601String();
    newTimelineItem.withPrimaryKey("userEmail", email, "id", id);
    newTimelineItem.with("firstName", firstName);
    newTimelineItem.with("lastName", lastName);
    newTimelineItem.with("signinTime", signinTime);
    newTimelineItem.with("temperature", signinRequestModel.getSigninData().getTemperature());
    newTimelineItem.with("visitorType", signinRequestModel.getSigninData().getVisitorType());
    if (signinRequestModel.getSigninData().getYesQuestion() != null) {
      newTimelineItem.with("yesQuestion", signinRequestModel.getSigninData().getYesQuestion());
    }
    try {
      final PutItemOutcome outcome = timelineTable.putItem(newTimelineItem);
      logger.debug("New User inserted into database:\n" + outcome.getPutItemResult());
    } catch (Exception e) {
      logger.error("Unable to add new user with error: " + e.toString());
      throw new InterruptedException("Unable to add new user with error: " + e.toString());
    }
    // Create entry in signed in users, point to newest timeline
    final Item newSignedInItem = new Item();
    newSignedInItem.withPrimaryKey("email", email);
    newSignedInItem.with("id", id);
    newSignedInItem.with("firstName", firstName);
    newSignedInItem.with("lastName", lastName);
    try {
      final PutItemOutcome outcome = signedInTable.putItem(newSignedInItem);
      logger.debug("New User inserted into database:\n" + outcome.getPutItemResult());
    } catch (Exception e) {
      logger.error("Unable to add new user with error: " + e.toString());
      throw new InterruptedException("Unable to add new user with error: " + e.toString());
    }

    return new SigninEmailIdPair(id, email);
  }

  public void signOutUser(final SigninEmailIdPair signinEmailIdPair) throws InterruptedException {
    signOutUser(signinEmailIdPair, Utility.nowToFullIso8601String());
  }

  public void signOutUser(final SigninEmailIdPair signinEmailIdPair, final String signoutTime)
      throws InterruptedException {
    final Table timelineTable = this.database.getTable(this.databaseConstants.TIMELINE_TABLE);
    final Table signedInTable = this.database.getTable(this.databaseConstants.SIGNED_IN_TABLE);
    timelineTable.waitForActive();
    timelineTable.updateItem(
        new UpdateItemSpec()
            .withPrimaryKey(
                "userEmail", signinEmailIdPair.getEmail(), "id", signinEmailIdPair.getId())
            .withAttributeUpdate(new AttributeUpdate("signoutTime").put(signoutTime)));
    signedInTable.waitForActive();
    signedInTable.deleteItem(new PrimaryKey("email", signinEmailIdPair.getEmail()));
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

  public Map<UserRequestModel, SigninEmailIdPair> getAllUsersWhoAreSignedInDatabase()
      throws InterruptedException {
    createTableIfNotExist(this.databaseConstants.SIGNED_IN_TABLE);
    final Table signInTable = this.database.getTable(this.databaseConstants.SIGNED_IN_TABLE);
    final Map<UserRequestModel, SigninEmailIdPair> signedInUsers = new HashMap<>();
    signInTable.waitForActive();
    signInTable
        .scan()
        .forEach(
            item -> {
              signedInUsers.put(
                  new UserRequestModel(
                      item.getString("firstName"),
                      item.getString("lastName"),
                      item.getString("email")),
                  new SigninEmailIdPair(item.getString("id"), item.getString("email")));
            });
    return signedInUsers;
  }

  @Override
  public List<TimelineInstance> getSigninsBetween(final Date begin, final Date end)
      throws InterruptedException {
    createTableIfNotExist(this.databaseConstants.TIMELINE_TABLE);
    final Table timeline = this.database.getTable(this.databaseConstants.TIMELINE_TABLE);
    final Map<String, Object> expressionAttributeValues = new HashMap<>();
    expressionAttributeValues.put(":start", Utility.dateToFullIso8601String(begin));
    expressionAttributeValues.put(":end", Utility.dateToFullIso8601String(end));
    timeline.waitForActive();
    final ItemCollection<ScanOutcome> items =
        timeline.scan("signinTime BETWEEN :start AND :end", null, expressionAttributeValues);
    final List<TimelineInstance> timelineInstances = new ArrayList<>();
    items.forEach(
        item -> {
          final UserRequestModel user =
              new UserRequestModel(
                  item.getString("firstName"),
                  item.getString("lastName"),
                  item.getString("userEmail"));
          final SigninDataRequestModel signinData =
              new SigninDataRequestModel(
                  item.getString("yesQuestion"),
                  item.getDouble("temperature"),
                  item.getString("visitorType"));
          Date signinTime = null;
          Date signoutTime = null;
          final String startString = item.getString("signinTime");
          final String endString = item.getString("signoutTime");
          try {
            signinTime = Utility.stringToDate(startString);
            signoutTime = Utility.stringToDate(endString);
          } catch (ParseException e) {
            logger.warn(
                "Unable to parse '"
                    + startString
                    + "' and/or '"
                    + endString
                    + "' as a date: "
                    + e.toString());
          }
          timelineInstances.add(new TimelineInstance(user, signinData, signinTime, signoutTime));
        });
    return timelineInstances;
  }

  public boolean verifyPin(final String pin) throws InterruptedException {
    createTableIfNotExist(this.databaseConstants.CONFIG_TABLE);
    final Table configTable = this.database.getTable(this.databaseConstants.CONFIG_TABLE);
    configTable.waitForActive();
    final Item item =
        configTable.getItem(
            new PrimaryKey(
                this.databaseConstants.CONFIG_PRIMARY_KEY,
                this.databaseConstants.CONFIG_PIN_NUMBER));
    return pin.equals(item.getString(this.databaseConstants.CONFIG_VALUE));
  }

  public void changePin(final String newPin) throws InterruptedException {
    createTableIfNotExist(this.databaseConstants.CONFIG_TABLE);
    final Table configTable = this.database.getTable(this.databaseConstants.CONFIG_TABLE);
    configTable.waitForActive();
    configTable.updateItem(
        new PrimaryKey(
            this.databaseConstants.CONFIG_PRIMARY_KEY, this.databaseConstants.CONFIG_PIN_NUMBER),
        new AttributeUpdate(this.databaseConstants.CONFIG_VALUE).put(newPin));
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
        table.putItem(
            new Item()
                .withPrimaryKey(
                    this.databaseConstants.CONFIG_PRIMARY_KEY,
                    this.databaseConstants.CONFIG_PIN_NUMBER)
                .with(this.databaseConstants.CONFIG_VALUE, "1234"));
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
