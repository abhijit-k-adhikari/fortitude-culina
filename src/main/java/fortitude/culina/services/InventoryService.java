package fortitude.culina.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.ListRepositoryService;

import fortitude.culina.entity.Inventory;
import fortitude.culina.repository.InventoryRepository;

@BrowserCallable
@AnonymousAllowed
public class InventoryService extends ListRepositoryService<Inventory, Long, InventoryRepository> {
}
