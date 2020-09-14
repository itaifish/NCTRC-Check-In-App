package org.nctrc.backend.model.response;

import java.util.Objects;
import javax.annotation.Nonnull;
import org.jetbrains.annotations.NotNull;

public class User {

  @Nonnull private final String name;
  @Nonnull private final String email;

  public User(@NotNull final String name, @NotNull final String email) {
    this.name = name;
    this.email = email;
  }

  @NotNull
  public String getName() {
    return name;
  }

  @NotNull
  public String getEmail() {
    return email;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return name.equals(user.name) && email.equals(user.email);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, email);
  }
}
