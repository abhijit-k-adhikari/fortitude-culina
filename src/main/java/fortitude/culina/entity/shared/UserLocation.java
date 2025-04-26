package fortitude.culina.entity.shared;

import fortitude.culina.entity.AbstractEntity;
import jakarta.persistence.Entity;

@Entity
public class UserLocation extends AbstractEntity {

    private String staffId;

    private String locationId;

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

   

}
