# Node.js Service Template

A production-ready Node.js microservice template with best practices, comprehensive monitoring, and seamless Backstage integration.

## This is a Backstage Software Template

This repository serves as a **Backstage Software Template** for creating new Node.js microservices. Developers can use this template through the Backstage UI to scaffold new services with a single click.

**Important**: This is the template repository. Generated services will be created in separate repositories.

## Quick Links

- **Use this template**: [Backstage Create Page](http://localhost:7001/create)
- **Usage Guide**: [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md)
- **Integration Guide**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **Template Configuration**: [template.yaml](./template.yaml)

---

## Features

- Modern Node.js with ES modules
- Express.js framework
- Production-ready security (Helmet, CORS, rate limiting)
- Structured logging with Winston
- OpenAPI/Swagger documentation
- Docker and Docker Compose support
- Git hooks with Husky
- Code quality tools (ESLint, Prettier)
- Backstage Software Catalog integration
- TechDocs documentation
- Health check endpoints

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (optional)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Install git hooks
npm run prepare

# Start development server
npm run dev
```

Visit:
- API: http://localhost:3000/api/v1
- Health: http://localhost:3000/health
- Docs: http://localhost:3000/api-docs

## Available Scripts

| Command              | Description                                |
| -------------------- | ------------------------------------------ |
| `npm start`          | Start production server                    |
| `npm run dev`        | Start development server with hot reload   |
| `npm run lint`       | Run ESLint                                 |
| `npm run lint:fix`   | Fix ESLint errors automatically            |
| `npm run format`     | Format code with Prettier                  |
| `npm run validate`   | Run format check and linting               |
| `npm run docker:build` | Build Docker image                       |
| `npm run docker:run` | Start services with Docker Compose         |
| `npm run docker:stop`| Stop Docker Compose services               |

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
├── .github/            # GitHub Actions workflows
├── catalog-info.yaml   # Backstage catalog metadata
├── openapi.yaml        # OpenAPI specification
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
└── package.json        # NPM configuration
```

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `NODE_ENV`: Application environment (development, production)
- `PORT`: Server port (default: 3000)
- `LOG_LEVEL`: Logging level (debug, info, warn, error)
- `CORS_ORIGIN`: Allowed CORS origins

## Docker

### Development

```bash
docker-compose up
```

### Production Build

```bash
docker build -t node-service-template .
docker run -p 3000:3000 --env-file .env node-service-template
```

## API Documentation

Interactive API documentation is available at:
- Local: http://localhost:3000/api-docs
- Swagger/OpenAPI spec: `openapi.yaml`

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

## Using this Template in Backstage

### For Developers

1. Go to [Backstage Create Page](http://localhost:7001/create)
2. Find "Node.js Microservice" template
3. Fill in the form with your service details
4. Click "Create" and your new service will be generated

See [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md) for detailed instructions.

### For Platform Engineers

To register this template in Backstage, see [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md).

Quick registration:

```yaml
# Add to app-config.local.yaml
catalog:
  locations:
    - type: url
      target: https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml
      rules:
        - allow: [Template]
```

See [app-config.template.yaml](./app-config.template.yaml) for complete configuration example.

## Template Structure

This repository contains:

```
node-service-template/
├── template.yaml              # Backstage template definition
├── skeleton/                  # Template files (with Nunjucks variables)
│   ├── src/                   # Source code template
│   ├── catalog-info.yaml      # Backstage catalog template
│   ├── package.json           # Package configuration template
│   └── ...                    # Other templated files
├── TEMPLATE_USAGE.md          # Guide for developers using the template
├── INTEGRATION_GUIDE.md       # Guide for registering template in Backstage
├── app-config.template.yaml   # Example Backstage configuration
└── README.md                  # This file
```

## Template Features

Services generated from this template include:

- Modern Node.js with ES modules
- Express.js framework with best practices
- Production-ready security (Helmet, CORS, rate limiting)
- Structured logging with Winston
- OpenAPI/Swagger documentation
- Docker and Docker Compose support
- GitHub Actions CI/CD pipelines
- Code quality tools (ESLint, Prettier, Husky)
- Automatic Backstage catalog registration
- TechDocs documentation
- Health check endpoints
- Optional: Database (PostgreSQL), Redis, Prometheus metrics, Sentry integration

## Customizing the Template

To modify this template:

1. Update `template.yaml` to change parameters or scaffolder actions
2. Modify files in `skeleton/` directory
3. Use Nunjucks syntax for variables: `${{ values.variableName }}`
4. Test changes locally or in development Backstage instance
5. Commit and push to update the template

## Backstage Integration

This template is fully integrated with Backstage:

1. **Software Template**: Defined in `template.yaml`
2. **Catalog Entry**: Each generated service gets `catalog-info.yaml`
3. **TechDocs**: Documentation in `docs/` folder
4. **API Definition**: OpenAPI spec for API explorer
5. **Automatic Registration**: Services auto-register in catalog

## Documentation

Comprehensive documentation is available in the `docs/` folder and can be viewed through Backstage TechDocs:

- [Getting Started](docs/getting-started/overview.md)
- [Architecture](docs/architecture/project-structure.md)
- [API Reference](docs/api/overview.md)
- [Deployment](docs/deployment/docker.md)

## Testing the Template Locally

Before pushing template changes, test locally:

```bash
# Validate template syntax
npx @backstage/cli validate template.yaml

# Test in local Backstage instance
# Add to app-config.local.yaml:
catalog:
  locations:
    - type: url
      target: file:///Users/mak/workspace/ikki/cma/services/applications/node-service-template/template.yaml
      rules:
        - allow: [Template]
```

## Version History

- **v1.0.0** (2025-12-12): Initial Backstage template release
  - Node.js 18+ support
  - Express framework with best practices
  - Docker and CI/CD
  - Prometheus metrics
  - Comprehensive documentation

## Contributing

To improve this template:

1. Create a feature branch
2. Make your changes to `template.yaml` or `skeleton/` files
3. Test the template in Backstage
4. Update documentation (TEMPLATE_USAGE.md, INTEGRATION_GUIDE.md)
5. Submit a pull request

## Documentation

- **[TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md)**: Guide for developers using the template
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)**: Guide for platform engineers
- **[app-config.template.yaml](./app-config.template.yaml)**: Example Backstage configuration

## License

MIT

## Support

- **Template Issues**: [GitHub Issues](https://github.com/ikto-cma-cgm/node-service-template/issues)
- **Platform Team**: Contact via Slack or email
- **Backstage Docs**: [backstage.io](https://backstage.io)

---

**Maintained by**: Platform Team
**Last Updated**: 2025-12-12
**Template Version**: 1.0.0
