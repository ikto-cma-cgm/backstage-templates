# ${{ values.name }}

${{ values.description }}

## Overview

Ce service suit une approche OpenAPI-first. La spécification OpenAPI est récupérée depuis l'entité API `${{ values.apiRef }}` lors du build Maven et utilisée pour générer les interfaces Spring Boot via `openapi-generator-maven-plugin`.

## Catalog entities

- `Component`: service runtime Spring Boot
- API liée : `${{ values.apiRef }}` (entité API externe — source de vérité dans son propre repo)

## Getting started

> **Prérequis** : le repo de la spec OpenAPI (`${{ values.apiEntityName }}`) est privé.
> Exportez votre Personal Access Token avant de builder :
> ```bash
> export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
> ```

```bash
mvn clean install       # télécharge la spec et génère les interfaces API
mvn spring-boot:run -Plocal   # démarre en mode développement
```

## Implémentation

Après le build, implémentez l'interface générée :

```java
@RestController
public class MyController implements ${{ values.packageName }}.api.controller.MyApi {
    // ...
}
```

## Swagger UI

```
http://localhost:8080/swagger-ui.html
```
