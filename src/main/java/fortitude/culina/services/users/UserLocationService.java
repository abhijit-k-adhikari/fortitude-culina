package fortitude.culina.services.users;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import fortitude.culina.entity.shared.UserLocation;
import fortitude.culina.repository.UserLocationRepository;

@BrowserCallable
@AnonymousAllowed
public class UserLocationService {

    private final UserLocationRepository userLocationRepository;

    public UserLocationService(UserLocationRepository repository) {
        this.userLocationRepository = repository;
    }

    public List<UserLocation> getAllUserLocations() {
        return userLocationRepository.findAll();
    }

}
