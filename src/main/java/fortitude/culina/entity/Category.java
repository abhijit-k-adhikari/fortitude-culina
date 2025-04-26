package fortitude.culina.entity;

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
