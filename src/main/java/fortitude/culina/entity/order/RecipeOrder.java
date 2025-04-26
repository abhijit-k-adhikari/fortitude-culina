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
    private String locationId;

    @NotNull
    @NotBlank
    private String staffId;

    private String customerName;

    private String customerPhoneNumber;

    private String customerEmailId;

    private String customerAddress;

    @NotNull
    private Integer numberOfOrderPlaced;

    @NotNull
    @NotBlank
    private String orderStageId;

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
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

    public Integer getNumberOfOrderPlaced() {
        return numberOfOrderPlaced;
    }

    public void setNumberOfOrderPlaced(Integer numberOfOrderPlaced) {
        this.numberOfOrderPlaced = numberOfOrderPlaced;
    }

    public String getOrderStageId() {
        return orderStageId;
    }

    public void setOrderStageId(String orderStageId) {
        this.orderStageId = orderStageId;
    }

}
