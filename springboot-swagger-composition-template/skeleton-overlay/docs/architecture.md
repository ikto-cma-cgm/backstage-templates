# Architecture

## Stack

- **Runtime**: Spring Boot ${{ values.springBootVersion }} / Java ${{ values.javaVersion }}
- **API generation**: openapi-generator-maven-plugin ${{ values.springBootVersion }}
- **Database**: PostgreSQL with Liquibase migrations
- **Observability**: Spring Actuator, Micrometer, OpenTelemetry tracing

## Package structure

```
${{ values.packageName }}/
├── Application.java
├── controller/          # hand-written REST controllers implementing generated interfaces
├── api/
│   ├── controller/      # generated interfaces (do not edit)
│   └── model/           # generated DTOs (do not edit)
└── service/             # business logic
```
