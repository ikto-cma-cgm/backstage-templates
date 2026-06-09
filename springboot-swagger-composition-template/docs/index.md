# Spring Boot Microservice with OpenAPI Spec Template

Ce template génère un microservice Spring Boot 3 piloté par une spécification OpenAPI distante, avec les métadonnées HIP et le support dual-provider (GitHub / GitLab).

## Ce qui est généré

- un service Spring Boot 3 prêt pour du contract-first
- une entité `Component` et une entité `API` dans le Catalog avec annotations HIP
- un `pom.xml` avec `openapi-generator-maven-plugin` configuré pour générer les interfaces Spring
- les fichiers TechDocs, Docker et pipeline CI

## Utilisation

1. fournissez une URL OpenAPI accessible publiquement (raw content)
2. renseignez le nom, la description, l'owner et le system
3. renseignez les métadonnées HIP (api-type, HOPEX code, etc.)
4. choisissez GitHub ou GitLab comme plateforme de publication
5. exécutez `mvn clean install` dans le dépôt généré pour générer les interfaces depuis la spec
6. implémentez les interfaces générées dans votre `@RestController`

## Lien avec swagger-template

Ce template est la composition Spring Boot + OpenAPI du `swagger-template` unitaire.
Pour gérer le contrat API indépendamment du service, utilisez `swagger-template` à la place.
