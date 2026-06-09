package ${{ values.packageName }}.service;

import ${{ values.packageName }}.api.model.ExampleResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class ExampleService {

    public List<ExampleResponse> listExamples() {
        ExampleResponse example = new ExampleResponse();
        example.setId(1L);
        example.setName("${{ values.name }} - example");
        return List.of(example);
    }

}
