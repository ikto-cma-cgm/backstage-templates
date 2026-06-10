package ${{ values.packageName }}.controller;

import ${{ values.packageName }}.api.HealthApiDelegate;
import ${{ values.packageName }}.api.model.HealthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Implements the generated HealthApiDelegate.
 * The @RestController and @RequestMapping("/health") are handled by the generated HealthApiController.
 * Run `mvn generate-sources` to regenerate the API stubs from the OpenAPI spec.
 */
@Component
@RequiredArgsConstructor
public class HealthController implements HealthApiDelegate {

    @Override
    public ResponseEntity<HealthResponse> getHealth() {
        HealthResponse response = new HealthResponse();
        response.setStatus("UP");
        return ResponseEntity.ok(response);
    }

}
