package ${{ values.packageName }}.controller;

import ${{ values.packageName }}.api.ExampleApi;
import ${{ values.packageName }}.api.model.ExampleResponse;
import ${{ values.packageName }}.service.ExampleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
class ExampleController implements ExampleApi {

    private final ExampleService exampleService;

    @Override
    public ResponseEntity<List<ExampleResponse>> listExamples() {
        return ResponseEntity.ok(exampleService.listExamples());
    }

}
