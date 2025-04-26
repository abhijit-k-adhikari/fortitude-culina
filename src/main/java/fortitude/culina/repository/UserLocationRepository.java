package fortitude.culina.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import fortitude.culina.entity.shared.UserLocation;
import fortitude.culina.entity.users.User;

public interface UserLocationRepository extends JpaRepository<UserLocation, Long>, JpaSpecificationExecutor<User> {

    List<UserLocation> findAllByLocationId(String locationId);
}
