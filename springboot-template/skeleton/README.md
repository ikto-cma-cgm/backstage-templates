# ${{ values.name }}

${{ values.description }}

Scaffolded from the [Spring Boot Microservice](https://github.com/ikto-cma-cgm/backstage-templates/tree/main/springboot-template) Golden Path.

## Stack

- Java ${{ values.javaVersion }} · Spring Boot ${{ values.springBootVersion }} · Maven
- H2 in-memory (default) · Spring Data JPA · Swagger UI · Actuator

## Getting Started

```bash
mvn spring-boot:run
```

The service starts on port **8080** with an H2 in-memory database.  
H2 console available at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:${{ values.name }}`).

## Build

```bash
mvn clean package -DskipTests
docker build -t ${{ values.name }}:local .
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8080` | HTTP server port |
| `LOG_LEVEL` | `INFO` | Log level (`DEBUG`, `INFO`, `WARN`, `ERROR`) |

> To connect to a real database, override `spring.datasource.*` via environment variables or a dedicated Spring profile.

## Endpoints

| URL | Description |
|---|---|
| `http://localhost:8080/swagger-ui.html` | Swagger UI |
| `http://localhost:8080/h2-console` | H2 console |
| `http://localhost:9090/actuator/health` | Health check |
| `http://localhost:9090/actuator/metrics` | Metrics |

## Owner

Team: **${{ values.owner }}** — System: **${{ values.system }}** — Domain: **${{ values.domain }}**
