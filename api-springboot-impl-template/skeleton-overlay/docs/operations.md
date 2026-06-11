# Operations

## Health Checks

| Endpoint | Expected response | What it checks |
|---|---|---|
| `GET /health` | `{"status":"UP"}` | Service is alive (implemented in `HealthController`) |
| `GET /actuator/health` | `{"status":"UP"}` | Spring Boot Actuator — includes DB connectivity |
| `GET /actuator/health/readiness` | `{"status":"UP"}` | Ready to receive traffic |
| `GET /actuator/health/liveness` | `{"status":"UP"}` | Service is alive |

## Environment Variables

| Variable | Required | Default | Description |
|---|:---:|---|---|
| `SPRING_DATASOURCE_URL` | ✅ | — | JDBC URL. Ex: `jdbc:postgresql://localhost:5432/mydb` |
| `SPRING_DATASOURCE_USERNAME` | ✅ | — | Database username |
| `SPRING_DATASOURCE_PASSWORD` | ✅ | — | Database password |
| `PORT` | ❌ | `8080` | HTTP server port |
| `LOG_LEVEL` | ❌ | `INFO` | Root log level |
| `JAVA_OPTS` | ❌ | — | JVM options. Ex: `-Xms256m -Xmx512m` |

## Start / Stop

```bash
# Build
mvn clean package -DskipTests

# Start
java -jar target/${{ values.name }}-1.0.0.jar

# Docker
docker build -t ${{ values.name }}:latest docker/
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${{ values.name }} \
  -e SPRING_DATASOURCE_USERNAME=app \
  -e SPRING_DATASOURCE_PASSWORD=secret \
  ${{ values.name }}:latest
```

## Logs

The service uses structured JSON logging (Logback). Each log line includes:

| Field | Description |
|---|---|
| `timestamp` | ISO-8601 |
| `level` | DEBUG / INFO / WARN / ERROR |
| `logger` | Class name |
| `message` | Log message |
| `traceId` | OpenTelemetry trace ID (if available) |

Filter logs by level:
```bash
kubectl logs deploy/${{ values.name }} | jq 'select(.level == "ERROR")'
```

## Metrics

Prometheus metrics are available at:
```
GET /actuator/prometheus
```

Key metrics to watch:
- `http_server_requests_seconds` — request latency per endpoint
- `jvm_memory_used_bytes` — heap / non-heap usage
- `hikaricp_connections_active` — active DB connections

## Regenerating the API (spec change workflow)

1. The spec owner updates `openapi.yaml` in **${{ values.apiName }}** repository
2. Pull latest changes (if the spec URL points to a branch, the next build auto-picks it up)
3. Run `mvn generate-sources` locally to see breaking changes
4. Update delegate implementations if method signatures changed
5. Run tests: `mvn test`

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `CompilationError: cannot find symbol ResourcesApiDelegate` | Stubs not generated | Run `mvn generate-sources` |
| `404` on `/resources` | Generated controller not scanned | Ensure `@SpringBootApplication` in root package `${{ values.packageName }}` |
| `Connection refused` on DB | Missing env vars | Set `SPRING_DATASOURCE_*` |
| Spec URL unreachable at build time | No network access to `${{ values.apiRepoOwner }}/${{ values.apiName }}` | Check network / proxy settings |
| Duplicate endpoint mapping | Base `HealthController` conflicts with generated | Ensure overlay `HealthController` implements `HealthApiDelegate` |
