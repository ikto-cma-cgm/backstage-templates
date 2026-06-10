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

## Build Docker

Le Dockerfile se trouve dans `docker/`. Builder depuis la **racine du projet** :

```bash
mvn clean package -DskipTests
docker build -f docker/Dockerfile -t ${{ values.name }}:local .
```

## Monitoring

Actuator est exposé sur `http://localhost:8080/actuator`.
