# Node Service Template - Documentation Index

Complete documentation index for easy navigation.

## Start Here

New to this template? Start with these documents:

1. **[README.md](README.md)** - Quick start guide (5 min read)
2. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - One-page reference (2 min read)
3. **[SETUP_SUMMARY.md](SETUP_SUMMARY.md)** - Complete setup guide (10 min read)

## Documentation by Category

### Getting Started

| Document | Description | Audience |
|----------|-------------|----------|
| [README.md](README.md) | Quick start and overview | All users |
| [docs/getting-started/overview.md](docs/getting-started/overview.md) | Detailed project overview | New developers |
| [docs/getting-started/installation.md](docs/getting-started/installation.md) | Installation instructions | New developers |
| [docs/getting-started/configuration.md](docs/getting-started/configuration.md) | Configuration guide | All developers |
| [docs/getting-started/running-locally.md](docs/getting-started/running-locally.md) | Local development guide | All developers |

### Reference

| Document | Description | Audience |
|----------|-------------|----------|
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | One-page quick reference | All users |
| [openapi.yaml](openapi.yaml) | OpenAPI 3.0 specification | API consumers |
| [catalog-info.yaml](catalog-info.yaml) | Backstage metadata | Platform team |

### Project Information

| Document | Description | Audience |
|----------|-------------|----------|
| [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | Comprehensive project overview | All stakeholders |
| [SETUP_SUMMARY.md](SETUP_SUMMARY.md) | Setup summary and statistics | Developers |
| [docs/architecture/project-structure.md](docs/architecture/project-structure.md) | Architecture and structure | Developers |

### Integration & Operations

| Document | Description | Audience |
|----------|-------------|----------|
| [BACKSTAGE_INTEGRATION.md](BACKSTAGE_INTEGRATION.md) | Backstage integration guide | Platform team |
| [Dockerfile](Dockerfile) | Docker image configuration | DevOps |
| [docker-compose.yml](docker-compose.yml) | Local orchestration setup | Developers |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI/CD pipeline | DevOps |

### Development

| Document | Description | Audience |
|----------|-------------|----------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines | Contributors |
| [.eslintrc.json](.eslintrc.json) | ESLint configuration | Developers |
| [.prettierrc](.prettierrc) | Prettier configuration | Developers |

## Code Organization

### Source Code (`src/`)

| Path | Purpose |
|------|---------|
| [src/index.js](src/index.js) | Application entry point |
| [src/config/config.js](src/config/config.js) | Environment configuration |
| [src/config/logger.js](src/config/logger.js) | Winston logger setup |
| [src/middleware/errorHandler.js](src/middleware/errorHandler.js) | Error handling middleware |
| [src/middleware/rateLimiter.js](src/middleware/rateLimiter.js) | Rate limiting middleware |
| [src/middleware/requestLogger.js](src/middleware/requestLogger.js) | Request logging middleware |
| [src/middleware/validator.js](src/middleware/validator.js) | Input validation middleware |
| [src/routes/api.routes.js](src/routes/api.routes.js) | Main API router |
| [src/routes/example.routes.js](src/routes/example.routes.js) | Example CRUD endpoints |
| [src/routes/health.routes.js](src/routes/health.routes.js) | Health check endpoints |
| [src/routes/swagger.routes.js](src/routes/swagger.routes.js) | Swagger UI routes |

## Configuration Files

| File | Purpose |
|------|---------|
| [package.json](package.json) | NPM dependencies and scripts |
| [.env.example](.env.example) | Environment variables template |
| [.eslintrc.json](.eslintrc.json) | ESLint configuration |
| [.prettierrc](.prettierrc) | Prettier configuration |
| [.gitignore](.gitignore) | Git ignore rules |
| [.dockerignore](.dockerignore) | Docker ignore rules |
| [mkdocs.yml](mkdocs.yml) | TechDocs configuration |

## Use Cases

### I want to...

#### Start Development
1. Read [README.md](README.md)
2. Run `./scripts/setup.sh`
3. Follow [docs/getting-started/running-locally.md](docs/getting-started/running-locally.md)

#### Understand the Architecture
1. Read [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
2. Review [docs/architecture/project-structure.md](docs/architecture/project-structure.md)
3. Browse [src/](src/) folder

#### Integrate with Backstage
1. Read [BACKSTAGE_INTEGRATION.md](BACKSTAGE_INTEGRATION.md)
2. Update [catalog-info.yaml](catalog-info.yaml)
3. Register in Backstage

#### Contribute Code
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Check [.eslintrc.json](.eslintrc.json) for code style
3. Follow Git workflow

#### Deploy with Docker
1. Review [Dockerfile](Dockerfile)
2. Check [docker-compose.yml](docker-compose.yml)
3. Run `npm run docker:build`

#### Understand the API
1. View [openapi.yaml](openapi.yaml)
2. Start server: `npm run dev`
3. Visit http://localhost:3000/api-docs

#### Configure Environment
1. Copy [.env.example](.env.example) to `.env`
2. Read [docs/getting-started/configuration.md](docs/getting-started/configuration.md)
3. Update values

## Quick Navigation

### By Role

#### Backend Developer
Start with:
- [README.md](README.md)
- [docs/getting-started/running-locally.md](docs/getting-started/running-locally.md)
- [src/routes/example.routes.js](src/routes/example.routes.js)

#### DevOps Engineer
Start with:
- [Dockerfile](Dockerfile)
- [docker-compose.yml](docker-compose.yml)
- [.github/workflows/ci.yml](.github/workflows/ci.yml)

#### Platform Engineer
Start with:
- [BACKSTAGE_INTEGRATION.md](BACKSTAGE_INTEGRATION.md)
- [catalog-info.yaml](catalog-info.yaml)
- [mkdocs.yml](mkdocs.yml)

#### API Consumer
Start with:
- [openapi.yaml](openapi.yaml)
- http://localhost:3000/api-docs
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

#### Project Manager
Start with:
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
- [SETUP_SUMMARY.md](SETUP_SUMMARY.md)
- [README.md](README.md)

## Document Types

### Guides (Step-by-step)
- [docs/getting-started/installation.md](docs/getting-started/installation.md)
- [docs/getting-started/running-locally.md](docs/getting-started/running-locally.md)
- [BACKSTAGE_INTEGRATION.md](BACKSTAGE_INTEGRATION.md)

### References (Look-up)
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- [openapi.yaml](openapi.yaml)
- [docs/architecture/project-structure.md](docs/architecture/project-structure.md)

### Overviews (Understanding)
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
- [docs/getting-started/overview.md](docs/getting-started/overview.md)
- [README.md](README.md)

### Specifications (Technical)
- [openapi.yaml](openapi.yaml)
- [catalog-info.yaml](catalog-info.yaml)
- [package.json](package.json)

## Common Questions

### How do I start the service?
See: [docs/getting-started/running-locally.md](docs/getting-started/running-locally.md)

### What environment variables are available?
See: [.env.example](.env.example) and [docs/getting-started/configuration.md](docs/getting-started/configuration.md)

### How do I add a new endpoint?
See: [src/routes/example.routes.js](src/routes/example.routes.js) and [CONTRIBUTING.md](CONTRIBUTING.md)

### How do I integrate with Backstage?
See: [BACKSTAGE_INTEGRATION.md](BACKSTAGE_INTEGRATION.md)

### What's the project structure?
See: [docs/architecture/project-structure.md](docs/architecture/project-structure.md)

### How do I deploy?
See: [Dockerfile](Dockerfile) and [docker-compose.yml](docker-compose.yml)

### What are the code style rules?
See: [.eslintrc.json](.eslintrc.json), [.prettierrc](.prettierrc), and [CONTRIBUTING.md](CONTRIBUTING.md)

### Where are the API docs?
See: [openapi.yaml](openapi.yaml) or http://localhost:3000/api-docs

## External Resources

### Technologies Used
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Winston Logger](https://github.com/winstonjs/winston)
- [Joi Validation](https://joi.dev/api/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [MkDocs](https://www.mkdocs.org/)

### Best Practices
- [12-Factor App](https://12factor.net/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [REST API Best Practices](https://restfulapi.net/)

### Platform Integration
- [Backstage Documentation](https://backstage.io/docs)
- [Backstage Software Catalog](https://backstage.io/docs/features/software-catalog/)
- [TechDocs](https://backstage.io/docs/features/techdocs/)

## File Statistics

- **Total Files**: 38
- **Source Files**: 13
- **Documentation Files**: 11
- **Configuration Files**: 10
- **Total Size**: ~204KB

## Last Updated

This index was last updated: **2024-12-12**

## Feedback

Found an issue or have suggestions for improving the documentation?
- Create an issue in the repository
- Contact the Platform Team
- See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Navigation Tip**: Use your browser's search (Ctrl/Cmd + F) to quickly find specific topics in this index.
