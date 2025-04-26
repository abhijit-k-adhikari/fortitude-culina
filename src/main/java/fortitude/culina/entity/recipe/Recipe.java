package fortitude.culina.entity.recipe;

import java.time.LocalDate;

import fortitude.culina.entity.AbstractEntity;
import jakarta.persistence.Entity;

@Entity
public class Recipe extends AbstractEntity {

    private String recipeName;
    private String ingredientSummary;
    private String preparationMethod;
    private LocalDate dateAdded;

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getIngredientSummary() {
        return ingredientSummary;
    }

    public void setIngredientSummary(String ingredientSummary) {
        this.ingredientSummary = ingredientSummary;
    }

    public String getPreparationMethod() {
        return preparationMethod;
    }

    public void setPreparationMethod(String preparationMethod) {
        this.preparationMethod = preparationMethod;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }
}
