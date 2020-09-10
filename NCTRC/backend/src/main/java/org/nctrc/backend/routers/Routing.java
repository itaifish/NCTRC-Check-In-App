package org.nctrc.backend.routers;

import com.google.inject.Injector;
import java.lang.reflect.ParameterizedType;
import javax.inject.Inject;

/**
 * A Routing class copied from
 * https://github.com/alzuma/javalin-java-10-guice/blob/master/src/main/java/io/alzuma/Routing.java
 *
 * @param <T> Controller to route through
 */
public abstract class Routing<T> {
  @Inject private Injector injector;

  private Class<T> controller;

  protected Routing() {}

  public abstract void bindRoutes();

  public T getController() {
    return injector.getInstance(getControllerFromGenericType());
  }

  private Class<T> getControllerFromGenericType() {
    if (controller == null) {
      controller =
          (Class<T>)
              ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }
    return controller;
  }
}
