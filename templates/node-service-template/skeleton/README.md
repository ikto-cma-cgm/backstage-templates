# ${{ values.name | title }}

${{ values.description }}

**Generated from:** [node-service-template](https://github.com/ikto-cma-cgm/node-service-template)
**Owner:** ${{ values.owner }}
**Created:** ${{ values.timestamp }}

## Features

- Modern Node.js ${{ values.nodeVersion }} with ES modules
- Express.js framework with best practices
- Production-ready security (Helmet, CORS, rate limiting)
- Structured logging with Winston
- OpenAPI/Swagger documentation
{%- if values.enableDocker %}
- Docker and Docker Compose support
{%- endif %}
{%- if values.enableCICD %}
- Automated CI/CD with GitHub Actions
{%- endif %}
- Git hooks with Husky for code quality
- Code quality tools (ESLint, Prettier)
- Backstage Software Catalog integration
- TechDocs documentation
- Health check endpoints
{%- if values.enablePrometheus %}
- Prometheus metrics exposition
{%- endif %}
{%- if values.enableSentry %}
- Sentry error tracking integration
{%- endif %}
{%- if values.includeDatabase %}
- Database configuration (PostgreSQL/Knex)
{%- endif %}
{%- if values.includeRedis %}
- Redis caching support
{%- endif %}

## Prerequisites

- Node.js >= ${{ values.nodeVersion }}
- npm >= 9.0.0
{%- if values.enableDocker %}
- Docker (optional, for containerized development)
{%- endif %}

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# Update PORT, LOG_LEVEL, and other settings

# Install git hooks
npm run prepare

# Start development server
npm run dev
```

Visit:
- API: http://localhost:${{ values.port }}/api/v1
- Health: http://localhost:${{ values.port }}/health
- Docs: http://localhost:${{ values.port }}/api-docs

## Available Scripts

| Command              | Description                                |
| -------------------- | ------------------------------------------ |
| `npm start`          | Start production server                    |
| `npm run dev`        | Start development server with hot reload   |
| `npm run lint`       | Run ESLint                                 |
| `npm run lint:fix`   | Fix ESLint errors automatically            |
| `npm run format`     | Format code with Prettier                  |
| `npm run validate`   | Run format check and linting               |
{%- if values.enableDocker %}
| `npm run docker:build` | Build Docker image                       |
| `npm run docker:run` | Start services with Docker Compose         |
| `npm run docker:stop`| Stop Docker Compose services               |
{%- endif %}

## Project Structure

```
.
├── src/
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── models/          # Data models
│   └── index.js         # Application entry point
├── docs/               # TechDocs documentation
{%- if values.enableCICD %}
├── .github/            # GitHub Actions workflows
{%- endif %}
├── catalog-info.yaml   # Backstage catalog metadata
├── openapi.yaml        # OpenAPI specification
{%- if values.enableDocker %}
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
{%- endif %}
└── package.json        # NPM configuration
```

## Environment Variables

Copy `.env.example` to `.env` and configure the following:

| Variable      | Description                              | Default        |
| ------------- | ---------------------------------------- | -------------- |
| `NODE_ENV`    | Application environment                  | development    |
| `PORT`        | Server port                              | ${{ values.port }} |
| `LOG_LEVEL`   | Logging level (debug/info/warn/error)    | ${{ values.logLevel }} |
| `CORS_ORIGIN` | Allowed CORS origins                     | *              |
{%- if values.includeDatabase %}
| `DB_HOST`     | Database host                            | localhost      |
| `DB_PORT`     | Database port                            | 5432           |
| `DB_NAME`     | Database name                            | ${{ values.name }} |
| `DB_USER`     | Database user                            | postgres       |
| `DB_PASSWORD` | Database password                        | -              |
{%- endif %}
{%- if values.includeRedis %}
| `REDIS_HOST`  | Redis host                               | localhost      |
| `REDIS_PORT`  | Redis port                               | 6379           |
{%- endif %}
{%- if values.enableSentry %}
| `SENTRY_DSN`  | Sentry DSN for error tracking            | -              |
{%- endif %}

{%- if values.enableDocker %}

## Docker

### Development

```bash
docker-compose up
```

### Production Build

```bash
docker build -t ${{ values.name }} .
docker run -p ${{ values.port }}:${{ values.port }} --env-file .env ${{ values.name }}
```
{%- endif %}

## API Documentation

Interactive API documentation is available at:
- Local: http://localhost:${{ values.port }}/api-docs
- OpenAPI spec: `openapi.yaml`

Update the `openapi.yaml` file as you add new endpoints to keep documentation in sync.

## Health Checks

The service provides three health check endpoints:

- `GET /health` - Basic health check
- `GET /health/ready` - Kubernetes readiness probe
- `GET /health/live` - Kubernetes liveness probe

## Code Quality

### Linting

ESLint with Airbnb style guide:

```bash
npm run lint
npm run lint:fix
```

### Formatting

Prettier for consistent code formatting:

```bash
npm run format
npm run format:check
```

### Git Hooks

Husky and lint-staged run automatically before commits:
- Format staged files with Prettier
- Lint staged files with ESLint

{%- if values.enablePrometheus %}

## Metrics

Prometheus metrics are exposed at `/metrics` endpoint. Available metrics include:
- HTTP request duration
- HTTP request rate
- Process CPU and memory usage
- Node.js event loop lag
{%- endif %}

{%- if values.enableSentry %}

## Error Tracking

Sentry is configured for error tracking and performance monitoring. Configure the `SENTRY_DSN` environment variable to enable it.
{%- endif %}

## Backstage Integration

This service is fully integrated with Backstage:

1. **Software Catalog**: Defined in `catalog-info.yaml`
2. **TechDocs**: Documentation in `docs/` folder
3. **API Definition**: OpenAPI spec for API explorer
4. **Metadata**: Tags, links, and ownership information

The service is automatically registered in Backstage catalog.

## Documentation

Comprehensive documentation is available in the `docs/` folder and can be viewed through Backstage TechDocs:

- Getting Started
- Architecture
- API Reference
- Deployment Guide
- Operations & Monitoring

{%- if values.deploymentTarget == 'kubernetes' %}

## Kubernetes Deployment

Kubernetes manifests are provided for deployment:

```bash
kubectl apply -f k8s/
```

Ensure you configure:
- ConfigMaps for environment variables
- Secrets for sensitive data
- Service and Ingress for networking
- HorizontalPodAutoscaler for scaling
{%- endif %}

## Contributing

1. Create a feature branch from `${{ values.defaultBranch }}`
2. Make your changes
3. Ensure code passes linting and formatting
4. Update documentation if needed
5. Submit a pull request

## Monitoring and Operations

{%- if values.enableGrafana %}
- **Grafana Dashboard**: https://grafana.example.com/d/${{ values.name }}
{%- endif %}
{%- if values.enablePrometheus %}
- **Prometheus Metrics**: http://localhost:${{ values.port }}/metrics
{%- endif %}
- **Health Checks**: http://localhost:${{ values.port }}/health

## License

MIT

## Support

For questions and support, contact **${{ values.owner }}** or the Platform Team.

---

**Generated with Backstage Software Templates** | [Template Documentation](https://github.com/ikto-cma-cgm/node-service-template/blob/main/TEMPLATE_USAGE.md)
