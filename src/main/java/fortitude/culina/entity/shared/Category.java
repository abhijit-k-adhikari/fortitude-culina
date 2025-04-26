package fortitude.culina.entity.shared;

import fortitude.culina.entity.AbstractEntity;
import jakarta.persistence.Entity;

@Entity
public class Category extends AbstractEntity {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
