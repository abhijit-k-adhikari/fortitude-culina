package fortitude.culina.services.inventory;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import fortitude.culina.entity.inventory.Inventory;
import fortitude.culina.repository.InventoryRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@BrowserCallable
@AnonymousAllowed
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAllByOrderByNameAsc();
    }
}
