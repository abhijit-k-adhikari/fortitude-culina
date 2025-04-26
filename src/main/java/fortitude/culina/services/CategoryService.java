package fortitude.culina.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import fortitude.culina.repository.CategoryRepository;
import fortitude.culina.entity.Category;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@BrowserCallable
@AnonymousAllowed
public class CategoryService {

    @Autowired
    private CategoryRepository CategoryRepository;

    public List<Category> getAllCategories() {
        return CategoryRepository.findAll();
    }
}
