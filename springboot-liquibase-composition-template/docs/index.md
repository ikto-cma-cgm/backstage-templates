# Spring Boot Liquibase Composition Template

Ce template composite génère un dépôt unique contenant une application Spring Boot et un module `db/` pour les migrations Liquibase.

## Quand l'utiliser

- quand le service et ses migrations doivent vivre dans le même repository
- quand l'équipe souhaite un `Component` Backstage et une `Resource` Liquibase liés par `dependsOn`
- quand les développeurs applicatifs et base de données partagent le même cycle de livraison

## Ce qui est généré

- une application Spring Boot prête pour Maven, Docker, Sonar et Actuator
- un sous-répertoire `db/` avec scripts Liquibase et manifest XL Deploy
- un `catalog-info.yaml` multi-doc à la racine du service
- une documentation TechDocs pour l'architecture, l'API et l'exploitation

## Choisir le bon template

- utilisez ce template si vous voulez **un seul dépôt** pour le code et les migrations
- utilisez `springboot-service-template` si la base est gérée ailleurs
- utilisez `springboot-liquibase-template` si vous voulez **uniquement** un dépôt de migrations

## Paramètres clés

- identité du service et rattachement Catalog
- versions Java/Spring Boot et nom du package Java
- type de base de données et nom du changelog Liquibase
- destination GitHub ou GitLab du repository
