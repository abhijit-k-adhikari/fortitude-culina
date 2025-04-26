package fortitude.culina.services.shared;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import fortitude.culina.entity.order.OrderStage;
import fortitude.culina.repository.OrderStageRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@BrowserCallable
@AnonymousAllowed
public class OrderStageService {

    @Autowired
    private OrderStageRepository orderStageRepository;

    public List<OrderStage> getAllOrders() {
        return orderStageRepository.findAll();
    }
}
