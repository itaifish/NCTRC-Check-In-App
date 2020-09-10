import com.google.inject.Guice;
import com.google.inject.Inject;
import com.google.inject.Injector;
import com.google.inject.Module;
import org.nctrc.backend.modules.MainModule;
import org.nctrc.backend.services.TestService;

public class Main {

  @Inject private TestService service;

  public static void main(String args[]) {

    final Main main = new Main();

    final Module module = new MainModule();
    final Injector injector = Guice.createInjector(module);
    injector.injectMembers(main);

    main.run();
  }

  private void run() {
    service.sayHelloWorld();
  }
}
