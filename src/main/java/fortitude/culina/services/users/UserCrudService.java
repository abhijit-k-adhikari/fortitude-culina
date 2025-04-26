package fortitude.culina.services.users;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;

import fortitude.culina.entity.users.User;
import fortitude.culina.repository.UserRepository;

@BrowserCallable
@AnonymousAllowed
public class UserCrudService extends CrudRepositoryService<User, Long, UserRepository> {
}
