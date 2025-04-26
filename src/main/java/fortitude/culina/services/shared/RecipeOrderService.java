package fortitude.culina.services.shared;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import fortitude.culina.entity.order.RecipeOrder;
import fortitude.culina.repository.RecipeOrderRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@BrowserCallable
@AnonymousAllowed
public class RecipeOrderService {

    @Autowired
    private RecipeOrderRepository recipeOrderRepository;

    public List<RecipeOrder> getAllOrders() {
        return recipeOrderRepository.findAllByOrderByLocationIdAsc();
    }
}
