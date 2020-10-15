package org.nctrc.backend.managers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import java.util.Properties;
import javax.inject.Singleton;
import org.nctrc.backend.config.Constants;
import org.nctrc.backend.model.request.NewUserRequestModel;
import org.nctrc.backend.model.request.SigninRequestModel;

@Singleton
public class DatabaseManager {

  public static void main(String[] args) {
    new DatabaseManager();
  }

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
    final AmazonDynamoDB client =
        AmazonDynamoDBClientBuilder.standard().withRegion(Constants.REGION).build();
    System.out.println(client.listTables().toString());
  }

  public void addUser(final NewUserRequestModel userRequestModel) {
    // TODO: Implement
  }

  public void signinUser(final SigninRequestModel signinRequestModel) {
    // TODO: Implement
  }

  public int loadMaxCapacity() {
    // TODO: Allow getting and setting capacity
    return 10;
  }
}
