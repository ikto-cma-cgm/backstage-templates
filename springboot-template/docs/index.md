# Spring Boot Microservice Template

Ce template scaffolde un microservice Spring Boot 3 avec Maven, Docker et l'intégration Backstage.

## Ce qu'il génère

- **Spring Boot 3** avec Maven, Actuator, Swagger UI, Lombok
- **H2 in-memory** par défaut — aucune infrastructure requise pour démarrer
- **Spring Data JPA** pour la persistance (schéma créé automatiquement via `ddl-auto: create-drop`)
- **`catalog-info.yaml`** avec TechDocs, Jenkins et SonarQube pré-configurés
- **Dockerfile** et **pipeline CI** prêts à l'emploi

## Comment utiliser

Via la section **Create** dans Backstage → **Spring Boot Microservice**.

## Paramètres

| Groupe | Paramètres clés |
|---|---|
| Service identity | `name`, `description`, `owner` |
| Catalog placement | `system`, `domain` |
| Build | `javaVersion`, `groupId`, `packageName`, `springBootVersion` |
| Repository | `repoProvider`, `repoOwner` |

## Démarrage du service généré

```bash
mvn spring-boot:run
```

Démarre sur le port **8080** avec H2 in-memory. Pour connecter une vraie base de données, surcharger `spring.datasource.*` via variables d'environnement ou un profil Spring dédié.

