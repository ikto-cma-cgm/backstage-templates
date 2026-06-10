package ${{ values.packageName }}.controller;

import ${{ values.packageName }}.api.ResourcesApiDelegate;
import ${{ values.packageName }}.api.model.Resource;
import ${{ values.packageName }}.api.model.ResourcePage;
import ${{ values.packageName }}.api.model.ResourceRequest;
import ${{ values.packageName }}.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Implements the generated ResourcesApiDelegate.
 * The @RestController and route mappings are handled by the generated ResourcesApiController.
 * Run `mvn generate-sources` to regenerate the API stubs from the OpenAPI spec.
 */
@Component
@RequiredArgsConstructor
public class ResourcesController implements ResourcesApiDelegate {

    private final ResourceService resourceService;

    @Override
    public ResponseEntity<ResourcePage> listResources(Integer page, Integer size) {
        return ResponseEntity.ok(resourceService.listResources(page, size));
    }

    @Override
    public ResponseEntity<Resource> createResource(ResourceRequest resourceRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resourceService.createResource(resourceRequest));
    }

    @Override
    public ResponseEntity<Resource> getResource(String id) {
        return ResponseEntity.ok(resourceService.getResource(id));
    }

}
