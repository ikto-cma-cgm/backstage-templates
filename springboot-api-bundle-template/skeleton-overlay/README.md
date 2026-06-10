# ${{ values.name }}

${{ values.description }}

## Getting started

```bash
git clone <repo-url>
cd ${{ values.name }}
make init   # génère les sources API depuis openapi.yaml, les inline dans src/, compile — à lancer une seule fois
make run    # démarre localement sur http://localhost:8080
```

Swagger UI : **http://localhost:8080/swagger-ui.html**

## Ce que fait `make init`

1. **`mvn generate-sources`** — exécute `openapi-generator-maven-plugin` sur `src/main/resources/api/openapi.yaml`
2. **Remplacement de `src/main/java`** — les sources générées (interfaces controllers + DTOs) remplacent entièrement le contenu de `src/main/java`, seul `Application.java` est conservé
3. **Nettoyage du `pom.xml`** — le plugin `openapi-generator-maven-plugin` est retiré (les sources sont maintenant statiques, plus de codegen au build)
4. **`mvn compile`** — vérifie que tout compile

> ⚠️ `make init` est **idempotent mais destructif** : il écrase `src/main/java` à chaque exécution. Ne lancez-le qu'une seule fois après le clone.

## Implémenter la logique métier

Après `make init`, les interfaces générées se trouvent dans `src/main/java/${{ values.packagePath }}/api/controller/`.  
Créez des `@Service` qui les implémentent :

```java
@Service
public class BookingsApiDelegateImpl implements BookingsApiDelegate {

    @Override
    public ResponseEntity<Booking> createBooking(BookingRequest body) {
        // votre logique ici
        return ResponseEntity.status(HttpStatus.CREATED).body(...);
    }
}
```

## Structure du projet

```
src/
├── main/
│   ├── java/${{ values.packagePath }}/
│   │   ├── Application.java
│   │   └── api/
│   │       ├── controller/   ← interfaces générées depuis openapi.yaml (après make init)
│   │       └── model/        ← DTOs générés
│   └── resources/
│       └── api/
│           └── openapi.yaml  ← spec OpenAPI de l'entité ${{ values.apiEntityName }}
```

## Variables d'environnement

| Variable | Requis | Défaut | Description |
|---|---|---|---|
| `SERVER_PORT` | Non | `8080` | Port HTTP |
| `MANAGEMENT_SERVER_PORT` | Non | `9090` | Port Actuator |

## Catalog Backstage

| Entité | Type | Lien |
|---|---|---|
| `${{ values.name }}` | Component | [Repository](https://${{ values.repoProvider }}.com/${{ values.repoOwner }}/${{ values.name }}) |
| `${{ values.apiEntityName }}` | API | spec dans `src/main/resources/api/openapi.yaml` |
| System | `${{ values.system }}` | Domain : `${{ values.domain }}` |
