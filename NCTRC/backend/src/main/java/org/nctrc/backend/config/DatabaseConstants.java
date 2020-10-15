package org.nctrc.backend.config;

import com.amazonaws.services.dynamodbv2.model.AttributeDefinition;
import com.amazonaws.services.dynamodbv2.model.KeySchemaElement;
import com.amazonaws.services.dynamodbv2.model.KeyType;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ScalarAttributeType;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.inject.Singleton;

@Singleton
public class DatabaseConstants {

  public final String USERS_TABLE = "users";

  public final String CONFIG_TABLE = "config";

  public final int DEFAULT_MAX_CAPACITY = 10;

  public final ProvisionedThroughput PROVISIONED_THROUGHPUT = new ProvisionedThroughput(10L, 10L);

  public final Map<String, DatabaseConfigInformation> TABLE_CONFIG;

  public DatabaseConstants() {
    TABLE_CONFIG = new HashMap<>();
    TABLE_CONFIG.put(
        this.USERS_TABLE,
        new DatabaseConfigInformation(
            this.USERS_TABLE,
            Arrays.asList(
                new KeySchemaElement("email", KeyType.HASH),
                new KeySchemaElement("createDate", KeyType.RANGE)),
            Arrays.asList(
                new AttributeDefinition("email", ScalarAttributeType.S),
                new AttributeDefinition("createDate", ScalarAttributeType.S))));
    TABLE_CONFIG.put(
        this.CONFIG_TABLE,
        new DatabaseConfigInformation(
            this.CONFIG_TABLE,
            Collections.singletonList(new KeySchemaElement("name", KeyType.HASH)),
            Collections.singletonList(new AttributeDefinition("name", ScalarAttributeType.S))));
  }
}
