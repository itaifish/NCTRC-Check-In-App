package org.nctrc.backend.managers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.model.AttributeDefinition;
import com.amazonaws.services.dynamodbv2.model.KeySchemaElement;
import com.amazonaws.services.dynamodbv2.model.KeyType;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.amazonaws.services.dynamodbv2.model.ScalarAttributeType;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Date;
import java.util.Objects;
import java.util.Properties;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class DatabaseManager implements DatabaseManagerInterface {

  private static final Logger logger = LoggerFactory.getLogger(DatabaseManager.class);

  private final AmazonDynamoDB client;
  private final DynamoDB database;

  public DatabaseManager() {
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
    try {
      final Table usersTable =
          this.database.createTable(
              "users",
              Arrays.asList(
                  new KeySchemaElement("email", KeyType.HASH),
                  new KeySchemaElement("createDate", KeyType.RANGE)),
              Arrays.asList(
                  new AttributeDefinition("email", ScalarAttributeType.S),
                  new AttributeDefinition("createDate", ScalarAttributeType.S)),
              new ProvisionedThroughput(10L, 10L));
      usersTable.waitForActive();
      logger.debug("Create new table for users");
    } catch (ResourceInUseException e) {
      logger.debug("Not Creating new table for users - it already exists");
    } catch (InterruptedException e) {
      logger.error("Unable to create table: " + e.toString());
    }
    final Table usersTable = this.database.getTable("users");
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
    // TODO: Allow getting and setting capacity
    return 10;
  }
}
