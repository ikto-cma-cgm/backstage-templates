# ${{ values.name }}

${{ values.description }}

## Technologies

- Java ${{ values.javaVersion }}
- Spring Boot ${{ values.springBootVersion }}
- PostgreSQL
- Maven

## Lancement local

```bash
mvn clean install
mvn spring-boot:run -Plocal
```

## Monitoring

Actuator est exposé sur `http://localhost:8080/actuator`.
