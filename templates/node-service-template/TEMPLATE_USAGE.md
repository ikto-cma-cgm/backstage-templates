# Node.js Service Template - Usage Guide

This guide explains how to use the Node.js Microservice template in Backstage to create new services.

## Overview

The Node.js Service Template provides a production-ready foundation for creating microservices with:

- Modern Node.js with Express framework
- Built-in security, logging, and monitoring
- Docker support and CI/CD pipelines
- Automatic registration in Backstage catalog
- Comprehensive documentation with TechDocs
- Best practices for code quality and development workflow

## Prerequisites

Before using this template, ensure you have:

1. Access to Backstage instance (http://localhost:7001)
2. GitHub account with access to `ikto-cma-cgm` organization
3. Permissions to create new repositories
4. Basic understanding of Node.js and Express

## Creating a New Service

### Step 1: Access the Template

1. Navigate to Backstage: http://localhost:7001
2. Click on "Create..." in the left sidebar
3. Find "Node.js Microservice" in the available templates
4. Click "Choose" to start the scaffolding process

### Step 2: Configure Service Information

Fill in the required fields:

#### Service Name
- **Format**: lowercase, hyphens allowed (e.g., `user-management-service`)
- **Requirements**: Must start with a letter, 2-50 characters
- **Examples**:
  - `user-management-service`
  - `payment-gateway`
  - `notification-service`

#### Description
- **Purpose**: Brief description of what the service does
- **Max length**: 200 characters
- **Examples**:
  - "Manages user authentication and authorization"
  - "Handles payment processing and transaction management"
  - "Sends email and SMS notifications to users"

#### Owner
- **Type**: Team or individual from the Backstage catalog
- **Examples**: `platform-team`, `backend-team`, `john.doe`
- **Note**: The owner will be responsible for maintaining this service

### Step 3: Configure Repository

#### Repository Location
- **Host**: GitHub (github.com)
- **Organization**: `ikto-cma-cgm`
- **Repository Name**: Usually same as service name
- **Visibility**: Internal (default)

#### Default Branch
- **Options**: `main`, `master`, `develop`
- **Recommended**: `main`

### Step 4: Configure Service Settings

#### System Assignment (Optional)
- Select which system this service belongs to
- Helps organize services in the catalog
- Can be updated later in `catalog-info.yaml`

#### Service Port
- **Default**: 3000
- **Range**: 1024-65535
- **Note**: Ensure no conflicts with existing services in your environment

#### Node.js Version
- **Options**: 18.x, 20.x, 22.x
- **Default**: 18.x (LTS)
- **Recommendation**: Use LTS versions for production

#### Additional Features

**Database Configuration**
- Enable if your service needs PostgreSQL
- Includes Knex.js for migrations and queries
- Docker Compose configured with PostgreSQL

**Redis Configuration**
- Enable for caching and session management
- Includes Redis client configuration
- Docker Compose configured with Redis

### Step 5: CI/CD and Deployment

#### CI/CD Pipeline
- **Default**: Enabled
- **Provider**: GitHub Actions
- **Includes**: Linting, testing, Docker build, security scanning

#### Docker Support
- **Default**: Enabled
- **Includes**: Multi-stage Dockerfile, docker-compose.yml
- **Features**: Development and production builds

#### Deployment Target
- **Options**: Kubernetes, Docker Swarm, Cloud Run, ECS, None
- **Default**: Kubernetes
- **Note**: Choose based on your infrastructure

### Step 6: Monitoring and Observability

#### Prometheus Metrics
- **Default**: Enabled
- **Endpoint**: `/metrics`
- **Includes**: HTTP metrics, process metrics

#### Grafana Dashboard
- **Default**: Enabled
- **Includes**: Pre-configured dashboard templates

#### Sentry Error Tracking
- **Default**: Disabled
- **Enable for**: Production error monitoring
- **Requires**: Sentry DSN configuration

#### Log Level
- **Options**: debug, info, warn, error
- **Default**: info
- **Development**: Use `debug` for detailed logs
- **Production**: Use `info` or `warn`

### Step 7: Review and Create

1. Review all your selections
2. Click "Create" to scaffold the service
3. Wait for the process to complete (usually 30-60 seconds)

## Post-Creation Steps

After the template creates your service:

### 1. Clone the Repository

```bash
git clone https://github.com/ikto-cma-cgm/your-service-name.git
cd your-service-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your specific configuration
```

### 4. Start Development

```bash
# Local development
npm run dev

# Docker development
npm run docker:run
```

### 5. Verify the Service

Visit these endpoints to verify everything works:

- Health: http://localhost:PORT/health
- API Docs: http://localhost:PORT/api-docs
- Metrics: http://localhost:PORT/metrics (if enabled)

### 6. Customize Your Service

Now you can start building your service:

1. **Add Routes**: Create new route files in `src/routes/`
2. **Add Controllers**: Implement business logic in `src/controllers/`
3. **Add Models**: Define data models in `src/models/`
4. **Update OpenAPI**: Keep `openapi.yaml` in sync with your API
5. **Update Documentation**: Add detailed docs in `docs/` folder

## Template Structure

The generated service includes:

```
your-service-name/
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI/CD
├── docs/                         # TechDocs documentation
│   ├── index.md
│   ├── getting-started/
│   ├── architecture/
│   └── ...
├── src/
│   ├── config/                   # Configuration files
│   ├── middleware/               # Express middleware
│   ├── routes/                   # API routes
│   ├── controllers/              # Business logic
│   ├── models/                   # Data models
│   └── index.js                  # Entry point
├── catalog-info.yaml             # Backstage catalog entry
├── openapi.yaml                  # API specification
├── Dockerfile                    # Container image
├── docker-compose.yml            # Local development setup
├── package.json                  # Dependencies and scripts
├── .env.example                  # Environment template
└── README.md                     # Service documentation
```

## Best Practices

### 1. Update Documentation Immediately

- Keep `README.md` up-to-date with service-specific information
- Document API changes in `openapi.yaml`
- Add operational docs in the `docs/` folder

### 2. Configure CI/CD

- GitHub Actions workflows are pre-configured
- Review and adjust workflows in `.github/workflows/`
- Add repository secrets for deployments

### 3. Set Up Monitoring

- Configure Prometheus scraping
- Create Grafana dashboards
- Set up alerting rules
- Configure Sentry DSN (if enabled)

### 4. Security

- Review and update dependencies regularly
- Run `npm audit` periodically
- Configure rate limiting appropriately
- Use environment variables for secrets
- Never commit `.env` files

### 5. Code Quality

- Follow the ESLint configuration
- Use Prettier for consistent formatting
- Write tests for your endpoints
- Keep code coverage above 80%

### 6. Backstage Integration

- Keep `catalog-info.yaml` updated
- Add links to relevant dashboards
- Tag services appropriately
- Define API dependencies

## Updating the Catalog Entry

Edit `catalog-info.yaml` to customize:

```yaml
metadata:
  annotations:
    # Add monitoring integrations
    grafana/dashboard-selector: your-service-name
    prometheus.io/rule: your-service-name

    # Add links
  links:
    - url: https://grafana.example.com/d/your-dashboard
      title: Grafana Dashboard

spec:
  # Define dependencies
  dependsOn:
    - component:another-service

  # Define APIs consumed
  consumesApis:
    - user-service-api
```

## Available npm Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start with hot reload |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run validate` | Run all checks |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Start with Docker Compose |
| `npm run docker:stop` | Stop Docker containers |

## Troubleshooting

### Template Creation Fails

**Issue**: Template scaffolding fails

**Solutions**:
1. Verify GitHub permissions
2. Check repository name is unique
3. Ensure organization access
4. Check Backstage logs for details

### Port Conflicts

**Issue**: Service won't start due to port in use

**Solutions**:
1. Change PORT in `.env`
2. Stop conflicting services
3. Use Docker Compose port mapping

### Dependencies Installation Fails

**Issue**: `npm install` fails

**Solutions**:
1. Use Node.js version >= 18
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`
4. Run `npm install` again

### Docker Build Issues

**Issue**: Docker build fails

**Solutions**:
1. Check Dockerfile syntax
2. Verify base image availability
3. Check network connectivity
4. Review build logs for specific errors

## Advanced Configuration

### Adding Custom Middleware

Create middleware in `src/middleware/`:

```javascript
// src/middleware/myMiddleware.js
export const myMiddleware = (req, res, next) => {
  // Your middleware logic
  next();
};
```

Register in `src/index.js`:

```javascript
import { myMiddleware } from './middleware/myMiddleware.js';
app.use(myMiddleware);
```

### Configuring Database Migrations

If database is enabled:

```bash
# Create migration
npx knex migrate:make migration_name

# Run migrations
npx knex migrate:latest

# Rollback
npx knex migrate:rollback
```

### Adding Kubernetes Manifests

Create `k8s/` directory with:

```
k8s/
├── deployment.yaml
├── service.yaml
├── configmap.yaml
└── ingress.yaml
```

### Customizing CI/CD

Edit `.github/workflows/ci.yml` to add:

- Additional testing stages
- Deployment steps
- Security scanning
- Performance tests

## Template Maintenance

This template is maintained by the Platform Team:

- **Template Repository**: https://github.com/ikto-cma-cgm/node-service-template
- **Issues**: Report bugs and feature requests on GitHub
- **Updates**: Template is regularly updated with security patches and improvements

## Getting Help

- **Backstage Documentation**: Check TechDocs in your service
- **Platform Team**: Contact via Slack or email
- **GitHub Issues**: Report problems on the template repository
- **Community**: Join platform engineering discussions

## Contributing to the Template

To improve this template:

1. Fork the template repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Describe the improvements

## Changelog

### Version 1.0.0 (Initial Release)
- Node.js 18+ support
- Express framework with best practices
- Docker and Docker Compose
- GitHub Actions CI/CD
- Prometheus metrics
- Comprehensive documentation
- Backstage integration

---

**Last Updated**: 2025-12-12
**Template Version**: 1.0.0
**Maintained By**: Platform Team
