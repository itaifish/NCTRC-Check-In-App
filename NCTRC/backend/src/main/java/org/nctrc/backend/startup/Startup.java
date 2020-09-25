package org.nctrc.backend.startup;

import com.google.inject.Inject;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import org.nctrc.backend.startup.entrypoint.AppEntrypoint;
import org.nctrc.backend.startup.entrypoint.EntrypointType;

public class Startup {
  @Inject(optional = true)
  private Map<EntrypointType, AppEntrypoint> entrypoints = Collections.emptyMap();

  public void boot(EntrypointType entrypointType, String[] args) {
    var entryPoint = Optional.ofNullable(entrypoints.get(entrypointType));
    entryPoint.orElseThrow(() -> new RuntimeException("Entrypoint not defined")).boot(args);
  }
}
