package fortitude.culina.services.order;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;

import fortitude.culina.entity.order.RecipeOrder;
import fortitude.culina.repository.RecipeOrderRepository;

@BrowserCallable
@AnonymousAllowed
public class RecipeOrderCrudService extends CrudRepositoryService<RecipeOrder, Long, RecipeOrderRepository> {
}
