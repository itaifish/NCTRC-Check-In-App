package org.nctrc.backend.managers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.GetItemSpec;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Properties;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.config.DatabaseConfigInformation;
import org.nctrc.backend.config.DatabaseConstants;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.nctrc.backend.model.request.UserRequestModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class DatabaseManager implements DatabaseManagerInterface {

  private static final Logger logger = LoggerFactory.getLogger(DatabaseManager.class);

  private final AmazonDynamoDB client;

  private final DynamoDB database;

  private final DatabaseConstants databaseConstants;

  @Inject
  public DatabaseManager(final DatabaseConstants databaseConstants) {
    this.databaseConstants = databaseConstants;
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
    this.client = AmazonDynamoDBClientBuilder.standard().withRegion(Constants.REGION).build();
    this.database = new DynamoDB(this.client);
  }

  public void addUser(final NewUserRequestModel userRequestModel) {
    this.createTableIfNotExist(this.databaseConstants.USERS_TABLE);
    final Table usersTable = this.database.getTable(this.databaseConstants.USERS_TABLE);
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

  public void signinUser(final SigninRequestModel signinRequestModel) {
    // TODO: Implement
  }

  public int loadMaxCapacity() {
    createTableIfNotExist(this.databaseConstants.CONFIG_TABLE);
    final Table configTable = this.database.getTable(this.databaseConstants.CONFIG_TABLE);
    final Item maxCapacityItem =
        configTable.getItem(new GetItemSpec().withPrimaryKey("name", "maxCapacity"));
    return maxCapacityItem.getInt("value");
  }

  @Override
  public List<UserRequestModel> getAllUsers() throws InterruptedException {
    final List<UserRequestModel> users = new ArrayList<>();
    final Table usersTable = Objects.requireNonNull(this.database.getTable("users"));
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
                .withPrimaryKey("name", "maxCapacity")
                .with("value", databaseConstants.DEFAULT_MAX_CAPACITY));
      }
      logger.debug("Create new table " + tableName);
    } catch (ResourceInUseException e) {
      logger.debug("Not Creating new table " + tableName + " - it already exists");
    } catch (InterruptedException e) {
      logger.error("Unable to create table " + tableName + ": " + e.toString());
    }
  }
}
