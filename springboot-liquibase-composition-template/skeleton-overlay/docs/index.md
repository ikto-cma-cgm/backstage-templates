# Overview

`${{ values.name }}` is a Spring Boot component in the `${{ values.system }}` system. The repository also embeds the `db/` directory that stores Liquibase migrations for the same delivery unit.

## Key components

- Spring Boot web application
- JPA persistence layer
- Actuator monitoring endpoints
- Liquibase migration package under `db/`

## Links

- Repository: `https://${{ values.repoProvider }}.com/${{ values.repoOwner }}/${{ values.name }}`
- Catalog entities: component `${{ values.name }}` and resource `${{ values.name }}-liquibase-db`
