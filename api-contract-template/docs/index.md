# OpenAPI Specification Template

Ce template génère un repository dédié à une spécification OpenAPI 3.0, indépendant de toute implémentation.

## Ce qui est généré

- un fichier `openapi.yaml` starter (OpenAPI 3.0.3)
- une entité `API` dans le Catalog Backstage avec métadonnées HIP
- les fichiers TechDocs

## Utilisation

1. renseignez le nom, la description, l'owner, le system et le domain
2. renseignez les métadonnées HIP (api-type, HOPEX code, etc.)
3. choisissez le provider repository (GitHub ou GitLab)
4. après le scaffold, éditez `openapi.yaml` pour définir votre contrat

## Réutilisation dans une composition

Ce template définit le squelette de référence pour la couche OpenAPI.
Il peut être combiné avec un template de service (Node.js, Spring Boot) via un template de composition
pour créer un repository service + contrat API dans une seule opération.
