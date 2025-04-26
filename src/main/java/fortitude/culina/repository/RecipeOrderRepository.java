package fortitude.culina.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import fortitude.culina.entity.order.RecipeOrder;

public interface RecipeOrderRepository extends JpaRepository<RecipeOrder, Long>, JpaSpecificationExecutor<RecipeOrder> {
    public List<RecipeOrder> findAllByOrderByLocationIdAsc();
}
