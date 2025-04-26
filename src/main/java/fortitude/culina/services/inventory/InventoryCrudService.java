package fortitude.culina.services.inventory;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;

import fortitude.culina.entity.inventory.Inventory;
import fortitude.culina.repository.InventoryRepository;

@BrowserCallable
@AnonymousAllowed
public class InventoryCrudService extends CrudRepositoryService<Inventory, Long, InventoryRepository> {
}
