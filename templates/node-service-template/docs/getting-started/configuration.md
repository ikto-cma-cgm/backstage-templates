# Configuration

This guide covers all configuration options for the Node Service Template.

## Environment Variables

Configuration is managed through environment variables following the [12-factor app](https://12factor.net/config) methodology.

### Setup

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your configuration

3. Never commit `.env` to version control

### Core Configuration

#### Application Settings

| Variable              | Type   | Default               | Description                    |
| --------------------- | ------ | --------------------- | ------------------------------ |
| `NODE_ENV`            | string | `development`         | Application environment        |
| `PORT`                | number | `3000`                | Server port                    |
| `SERVICE_NAME`        | string | `node-service-template` | Service identifier          |
| `SERVICE_VERSION`     | string | `1.0.0`               | Service version                |

#### Logging

| Variable    | Type   | Default | Description                       |
| ----------- | ------ | ------- | --------------------------------- |
| `LOG_LEVEL` | string | `info`  | Logging level (debug, info, warn, error) |
| `LOG_FORMAT`| string | `json`  | Log format (json, text)           |

#### Security

| Variable          | Type   | Default | Description                    |
| ----------------- | ------ | ------- | ------------------------------ |
| `CORS_ORIGIN`     | string | `*`     | Allowed CORS origins           |

#### Rate Limiting

| Variable                    | Type   | Default  | Description                     |
| --------------------------- | ------ | -------- | ------------------------------- |
| `RATE_LIMIT_WINDOW_MS`      | number | `900000` | Time window in milliseconds     |
| `RATE_LIMIT_MAX_REQUESTS`   | number | `100`    | Max requests per window         |

## Configuration by Environment

### Development

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
LOG_FORMAT=text
CORS_ORIGIN=*
```

### Staging

```env
NODE_ENV=staging
PORT=3000
LOG_LEVEL=info
LOG_FORMAT=json
CORS_ORIGIN=https://staging.example.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Production

```env
NODE_ENV=production
PORT=3000
LOG_LEVEL=warn
LOG_FORMAT=json
CORS_ORIGIN=https://example.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50
```

## Configuration Files

### ESLint (.eslintrc.json)

Configures code linting rules. Based on Airbnb style guide with some customizations.

Key rules:
- ES modules with `.js` extensions required
- Unused variables with `_` prefix allowed
- Console statements produce warnings

### Prettier (.prettierrc)

Code formatting configuration:
- 2 spaces indentation
- Single quotes
- 100 character line width
- Trailing commas (ES5)
- Semicolons required

### Husky (Git Hooks)

Pre-commit hook configuration in `.husky/pre-commit`:
- Runs lint-staged on changed files
- Formats code with Prettier
- Lints code with ESLint

## Docker Configuration

### Environment Variables in Docker

Pass environment variables to Docker:

```bash
# Using .env file
docker run --env-file .env node-service-template

# Using individual variables
docker run -e NODE_ENV=production -e PORT=3000 node-service-template

# Using Docker Compose
docker-compose up
```

### Docker Compose Variables

Override in `docker-compose.override.yml`:

```yaml
version: '3.8'
services:
  app:
    environment:
      - LOG_LEVEL=debug
      - CORS_ORIGIN=http://localhost:8080
```

## Kubernetes Configuration

### ConfigMap Example

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: node-service-config
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  LOG_FORMAT: "json"
  SERVICE_NAME: "node-service-template"
```

### Secret Example

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: node-service-secrets
type: Opaque
stringData:
  JWT_SECRET: "your-secret-key"
  DB_PASSWORD: "your-db-password"
```

## Best Practices

1. **Never commit secrets**: Use `.env.example` for documentation, never commit `.env`
2. **Use different configs per environment**: Separate development, staging, and production
3. **Validate on startup**: Service validates required variables on startup
4. **Use strong secrets**: Generate strong random values for production
5. **Rotate regularly**: Implement secret rotation policies
6. **Least privilege**: Only configure what's needed for each environment
7. **Document changes**: Update `.env.example` when adding new variables

## Troubleshooting

### Missing Environment Variables

If the service fails to start due to missing variables, check:

1. `.env` file exists and is in the correct location
2. All required variables are set
3. Variable names match exactly (case-sensitive)
4. No typos in variable names

### Environment Not Loading

Ensure:

1. `dotenv` package is installed
2. `dotenv.config()` is called early in `src/config/config.js`
3. File path is correct (default is `./.env`)

### Docker Variables Not Working

Check:

1. `.env` file is in the same directory as `docker-compose.yml`
2. Variables are properly formatted in `.env`
3. No quotes around values unless needed
4. Restart containers after changing variables
