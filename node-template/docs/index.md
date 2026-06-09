# Node.js Microservice Template

Ce template génère un microservice Node.js basé sur Express et TypeScript, prêt pour le Catalog Backstage CMA CGM.

## Ce qui est généré

- un service HTTP Express avec endpoint `/health`
- une configuration TypeScript standard
- un `Dockerfile` multi-stage
- les fichiers TechDocs et `catalog-info.yaml`
- l'intégration Jenkins et SonarQube

## Paramètres principaux

- **Service name** : identifiant unique en kebab-case
- **System** et **Domain** : placement Catalog
- **Node.js version** : version de runtime et de build
- **Service port** : port HTTP par défaut
- **Publish to** : GitHub ou GitLab

## Résultat attendu

Le template publie un dépôt prêt à démarrer localement avec `npm install` puis `npm run dev`.
