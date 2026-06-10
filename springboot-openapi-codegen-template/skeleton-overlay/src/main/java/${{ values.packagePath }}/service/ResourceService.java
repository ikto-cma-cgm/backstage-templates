package ${{ values.packageName }}.service;

import ${{ values.packageName }}.api.model.Resource;
import ${{ values.packageName }}.api.model.ResourcePage;
import ${{ values.packageName }}.api.model.ResourceRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * Business logic for resource operations.
 * Methods are called by ResourcesController which implements the generated ResourcesApiDelegate.
 */
@Service
public class ResourceService {

    public ResourcePage listResources(Integer page, Integer size) {
        ResourcePage resourcePage = new ResourcePage();
        resourcePage.setContent(List.of());
        resourcePage.setTotalElements(0);
        resourcePage.setTotalPages(0);
        return resourcePage;
    }

    public Resource createResource(ResourceRequest request) {
        Resource resource = new Resource();
        resource.setId(UUID.randomUUID().toString());
        resource.setName(request.getName());
        resource.setDescription(request.getDescription());
        return resource;
    }

    public Resource getResource(String id) {
        Resource resource = new Resource();
        resource.setId(id);
        resource.setName("${{ values.name }} resource " + id);
        return resource;
    }

}
