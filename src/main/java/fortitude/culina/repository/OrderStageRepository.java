package fortitude.culina.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import fortitude.culina.entity.order.OrderStage;

public interface OrderStageRepository extends JpaRepository<OrderStage, Long>, JpaSpecificationExecutor<OrderStage> {
    public List<OrderStage> findAll();
}
