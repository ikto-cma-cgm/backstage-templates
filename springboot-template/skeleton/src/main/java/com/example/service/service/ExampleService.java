package ${{ values.packageName }}.service;

import org.springframework.stereotype.Service;

@Service
class ExampleService {

    public String getInfo() {
        return "Service ${{ values.name }} running";
    }

}
