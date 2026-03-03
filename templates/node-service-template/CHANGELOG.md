# Changelog

All notable changes to the Node.js Service Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-12

### Added - Initial Backstage Template Release

#### Template Infrastructure
- Created `template.yaml` with comprehensive Backstage scaffolder configuration
- Implemented `skeleton/` directory with fully templatized files using Nunjucks
- Added `.backstage-template-ignore` to exclude non-essential files from scaffolding
- Created comprehensive documentation suite

#### Template Parameters
- **Service Information**: name, description, owner with validation
- **Repository Configuration**: GitHub URL picker, default branch selection
- **Service Configuration**: system assignment, port, Node.js version
- **Optional Features**: Database (PostgreSQL), Redis, CI/CD, Docker
- **Monitoring**: Prometheus metrics, Grafana dashboards, Sentry integration
- **Deployment**: Multiple deployment target options (Kubernetes, Docker Swarm, Cloud Run, ECS)

#### Scaffolder Actions
- `fetch:template` - Template fetching with conditional file copying
- `publish:github` - Automatic repository creation on GitHub
- `catalog:register` - Automatic service registration in Backstage catalog
- `github:issues:label:create` - Standard issue labels creation

#### Templatized Files
- `catalog-info.yaml` - Dynamic Backstage catalog entry with conditional annotations
- `package.json` - Service-specific dependencies and metadata
- `README.md` - Customized service documentation
- `.env.example` - Configuration template with optional features
- `Dockerfile` - Node.js version and port configuration
- `docker-compose.yml` - Dynamic service configuration with optional services
- `mkdocs.yml` - TechDocs configuration with service metadata

#### Documentation
- `TEMPLATE_USAGE.md` - Comprehensive guide for developers using the template
- `INTEGRATION_GUIDE.md` - Complete setup guide for platform engineers
- `app-config.template.yaml` - Example Backstage configuration
- Updated main `README.md` with template-specific information

#### Template Features
- Modern Node.js 18+ with ES modules support
- Express.js framework with production-ready middleware
- Security best practices (Helmet, CORS, rate limiting)
- Structured logging with Winston
- OpenAPI/Swagger documentation
- Docker multi-stage builds
- GitHub Actions CI/CD pipelines
- Code quality tools (ESLint, Prettier, Husky)
- Health check endpoints
- Optional Prometheus metrics
- Optional Sentry error tracking
- Optional PostgreSQL database integration
- Optional Redis caching

#### Developer Experience
- Interactive form with validation and help text
- Smart defaults for common configurations
- Conditional parameters based on selections
- Rich output with next steps and resource links
- Automatic GitHub repository creation and setup
- Immediate catalog registration

#### Platform Engineering
- Multiple registration methods documented
- Environment-specific configurations
- Template validation and testing procedures
- Troubleshooting guides
- Update and maintenance procedures

### Technical Details

#### Nunjucks Variables Used
- `${{ values.name }}` - Service name
- `${{ values.description }}` - Service description
- `${{ values.owner }}` - Team or user owner
- `${{ values.port }}` - Service port number
- `${{ values.nodeVersion }}` - Node.js version
- `${{ values.system }}` - System assignment
- `${{ values.destination }}` - Repository destination parsed from URL
- Conditional flags for all optional features

#### GitHub Integration
- Automatic repository creation
- Repository visibility: internal by default
- Delete branch on merge enabled
- Standard labels automatically created
- Git author information from user entity

#### Backstage Integration
- Template type: `service`
- Owner: `platform-team`
- Tags: `recommended`, `nodejs`, `express`, `microservice`, `rest-api`, `production-ready`
- Automatic catalog registration with `catalog:register` action
- TechDocs support for generated services

### Dependencies

#### Template requires:
- Backstage version with scaffolder v1beta3 support
- GitHub integration configured
- GitHub token with appropriate permissions (repo, workflow)
- Node.js 18+ for generated services

#### Generated services include:
- express ^4.18.2
- cors ^2.8.5
- helmet ^7.1.0
- winston ^3.11.0
- joi ^17.11.0
- Optional: prom-client, @sentry/node, pg, redis

### Breaking Changes
- None (initial release)

### Migration Notes
- For existing services: This template can be applied to new services only
- For template updates: Will be documented in future releases

### Known Issues
- None at this time

### Future Enhancements

Planned for future releases:
- Additional deployment targets (Azure Container Apps, Heroku)
- GraphQL API option
- MongoDB database option
- Testing framework integration (Jest, Mocha)
- E2E testing setup
- API versioning strategy
- gRPC support option
- Message queue integration (RabbitMQ, Kafka)
- Authentication middleware templates (JWT, OAuth2)
- Advanced monitoring (Jaeger tracing, OpenTelemetry)
- Multi-environment configuration templates
- Blue-green deployment option
- Canary deployment option

### Contributors
- Platform Team

### Links
- **Template Repository**: https://github.com/ikto-cma-cgm/node-service-template
- **Backstage Documentation**: https://backstage.io/docs/features/software-templates
- **Usage Guide**: [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md)
- **Integration Guide**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

---

## Template Versioning

The template follows semantic versioning:

- **MAJOR** version: Breaking changes to template structure or required parameters
- **MINOR** version: New features, new optional parameters, new scaffolder actions
- **PATCH** version: Bug fixes, documentation updates, dependency updates

## How to Update

When the template is updated:

1. Changes are committed to the repository
2. Backstage auto-refreshes the template (default: every 100 seconds)
3. Or manually refresh via Backstage catalog
4. Developers immediately get the latest version when creating new services

## Reporting Issues

Report bugs and request features:
- **GitHub Issues**: https://github.com/ikto-cma-cgm/node-service-template/issues
- **Platform Team**: Contact via Slack or email

---

**Format**: [Keep a Changelog](https://keepachangelog.com/)
**Versioning**: [Semantic Versioning](https://semver.org/)
