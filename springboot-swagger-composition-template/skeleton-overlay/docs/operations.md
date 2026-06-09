# Operations

## Health check

```
GET http://localhost:8080/health         → 200 OK
GET http://localhost:9090/actuator/health → full health details
```

## Metrics

Prometheus metrics exposed at `http://localhost:9090/actuator/prometheus`.

## Logs

Structured logs via Logback. Log level for `${{ values.packageName }}` is `INFO` by default.
