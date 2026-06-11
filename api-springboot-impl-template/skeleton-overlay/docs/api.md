# API Reference

The API contract for **${{ values.name }}** is defined in the **${{ values.apiName }}** specification.

## Contract Source

The `openapi-generator-maven-plugin` fetches the spec at each build from:

```
{%- if values.repoProvider == 'github' %}
https://raw.githubusercontent.com/${{ values.apiRepoOwner }}/${{ values.apiName }}/main/openapi.yaml
{%- else %}
https://${{ values.gitlabHost }}/${{ values.apiRepoOwner }}/${{ values.apiName }}/-/raw/main/openapi.yaml
{%- endif %}
```

To view the interactive spec, run the service and open:

```
http://localhost:8080/swagger-ui.html
```

## Endpoints

The following endpoints are implemented by this service. For full schema details, refer to the spec.

### Health

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Returns service health status |

**Response 200:**
```json
{ "status": "UP" }
```

### Resources

| Method | Path | Description |
|---|---|---|
| `GET` | `/resources` | List resources (paginated) |
| `POST` | `/resources` | Create a new resource |
| `GET` | `/resources/{id}` | Get a resource by ID |

**GET /resources — Response 200:**
```json
{
  "content": [
    { "id": "uuid", "name": "example", "description": "..." }
  ],
  "totalElements": 1,
  "totalPages": 1
}
```

**POST /resources — Request body:**
```json
{ "name": "my-resource", "description": "optional description" }
```

**POST /resources — Response 201:**
```json
{ "id": "generated-uuid", "name": "my-resource", "description": "..." }
```

## Error Format

All errors follow the `Fault` schema defined in the spec:

```json
{ "code": "NOT_FOUND", "message": "Resource with id 'xyz' not found" }
```

| HTTP Status | Meaning |
|---|---|
| `400` | Invalid request (validation error) |
| `404` | Resource not found |
| `500` | Internal server error |

## Regenerating stubs

If the API spec changes:

```bash
mvn generate-sources
```

Check `target/generated-sources/openapi/` for updated interfaces and models. Update your delegate implementations in `src/main/java/${{ values.packagePath }}/controller/` accordingly.
