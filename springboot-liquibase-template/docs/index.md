# Spring Boot Liquibase Template

Ce template génère un projet autonome de migrations Liquibase destiné aux services CMA CGM ayant besoin d'un dépôt dédié pour le schéma de base de données.

## Quand l'utiliser

- Quand les migrations SQL doivent être versionnées indépendamment d'une application Spring Boot
- Quand le déploiement des scripts passe par XL Deploy et un package Liquibase dédié
- Quand l'équipe doit supporter PostgreSQL ou Oracle avec le même squelette

## Ce qui est généré

- un `catalog-info.yaml` de type `Resource`
- un manifest XL Deploy prêt à empaqueter les scripts Liquibase
- un pipeline orienté packaging ZIP
- une documentation TechDocs pour l'exploitation et l'architecture

## Pré-requis

- Accès à XL Deploy pour déployer les changements
- Liquibase CLI pour tester localement les migrations
- Une base PostgreSQL ou Oracle disponible selon `dbType`
- Un owner Backstage et un system déjà définis dans le Catalog

## Références internes

- [Guide XL Deploy](https://wiki.cma-cgm.com/xl-deploy)
- [Guide Liquibase](https://wiki.cma-cgm.com/liquibase)
- [Standards Developer Portal](https://wiki.cma-cgm.com/developer-portal)
