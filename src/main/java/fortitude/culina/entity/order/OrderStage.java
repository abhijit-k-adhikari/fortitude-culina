package fortitude.culina.entity.order;

import fortitude.culina.entity.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class OrderStage extends AbstractEntity {

    @NotNull
    @NotBlank
    private String stage;

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

}
