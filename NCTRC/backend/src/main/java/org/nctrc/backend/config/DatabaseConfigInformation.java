package org.nctrc.backend.config;

import com.amazonaws.services.dynamodbv2.model.AttributeDefinition;
import com.amazonaws.services.dynamodbv2.model.KeySchemaElement;
import java.util.List;

public class DatabaseConfigInformation {

  private final String tableName;

  private final List<KeySchemaElement> keySchemaElements;

  private final List<AttributeDefinition> attributeDefinitions;

  public DatabaseConfigInformation(
      final String tableName,
      final List<KeySchemaElement> keySchemaElements,
      final List<AttributeDefinition> attributeDefinitions) {
    this.tableName = tableName;
    this.keySchemaElements = keySchemaElements;
    this.attributeDefinitions = attributeDefinitions;
  }

  public String getTableName() {
    return tableName;
  }

  public List<KeySchemaElement> getKeySchemaElements() {
    return keySchemaElements;
  }

  public List<AttributeDefinition> getAttributeDefinitions() {
    return attributeDefinitions;
  }
}
