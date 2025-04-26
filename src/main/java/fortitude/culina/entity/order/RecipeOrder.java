package fortitude.culina.entity.order;

import fortitude.culina.entity.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class RecipeOrder extends AbstractEntity {

    @NotNull
    @NotBlank
    private String recipeId;

    @NotNull
    @NotBlank
    private String recipe;

    @NotNull
    @NotBlank
    private String locationId;

    @NotNull
    @NotBlank
    private String location;

    @NotNull
    @NotBlank
    private String staffId;

    @NotNull
    @NotBlank
    private String staff;
    
    @NotNull
    @NotBlank
    private String orderStageId;

    @NotNull
    @NotBlank
    private String orderStage;
 
    @NotNull
    private Integer numberOfOrderPlaced;

    private String customerName;

    private String customerPhoneNumber;

    private String customerEmailId;

    private String customerAddress;

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getRecipe() {
        return recipe;
    }

    public void setRecipe(String recipe) {
        this.recipe = recipe;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public String getStaff() {
        return staff;
    }

    public void setStaff(String staff) {
        this.staff = staff;
    }

    public String getOrderStageId() {
        return orderStageId;
    }

    public void setOrderStageId(String orderStageId) {
        this.orderStageId = orderStageId;
    }

    public String getOrderStage() {
        return orderStage;
    }

    public void setOrderStage(String orderStage) {
        this.orderStage = orderStage;
    }

    public Integer getNumberOfOrderPlaced() {
        return numberOfOrderPlaced;
    }

    public void setNumberOfOrderPlaced(Integer numberOfOrderPlaced) {
        this.numberOfOrderPlaced = numberOfOrderPlaced;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhoneNumber() {
        return customerPhoneNumber;
    }

    public void setCustomerPhoneNumber(String customerPhoneNumber) {
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public String getCustomerEmailId() {
        return customerEmailId;
    }

    public void setCustomerEmailId(String customerEmailId) {
        this.customerEmailId = customerEmailId;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    

}
