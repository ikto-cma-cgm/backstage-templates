# Node.js Service Template - Complete Summary

## Overview

This is a **production-ready Backstage Software Template** for creating Node.js microservices. It enables developers to scaffold new services in minutes through the Backstage UI with best practices built-in.

## Template Structure

```
node-service-template/
├── template.yaml                  # Backstage template definition (v1beta3)
├── skeleton/                      # Template files with Nunjucks variables
│   ├── src/                       # Source code structure
│   │   ├── config/                # Configuration files
│   │   ├── middleware/            # Express middleware
│   │   ├── routes/                # API routes
│   │   ├── controllers/           # Business logic
│   │   ├── models/                # Data models
│   │   └── index.js               # Entry point
│   ├── docs/                      # TechDocs documentation
│   ├── .github/workflows/         # CI/CD pipelines
│   ├── catalog-info.yaml          # Backstage catalog entry (templated)
│   ├── package.json               # NPM config (templated)
│   ├── README.md                  # Service README (templated)
│   ├── Dockerfile                 # Container image (templated)
│   ├── docker-compose.yml         # Local development (templated)
│   ├── .env.example               # Environment config (templated)
│   ├── openapi.yaml               # API specification
│   └── mkdocs.yml                 # TechDocs config (templated)
├── TEMPLATE_USAGE.md              # Developer guide (how to use)
├── INTEGRATION_GUIDE.md           # Platform engineer guide (how to setup)
├── QUICK_START.md                 # 5-minute quick start
├── app-config.template.yaml       # Backstage configuration example
├── CHANGELOG.md                   # Version history
├── validate-template.sh           # Validation script
├── .backstage-template-ignore     # Files to exclude from scaffolding
└── README.md                      # This template's README

Total Files: ~50+ files in skeleton, 10+ documentation files
```

## Template Features

### Core Features
- ✅ Modern Node.js 18+ with ES modules
- ✅ Express.js framework with best practices
- ✅ Production-ready security (Helmet, CORS, rate limiting)
- ✅ Structured logging with Winston
- ✅ OpenAPI/Swagger documentation
- ✅ Health check endpoints (/, /ready, /live)
- ✅ Docker multi-stage builds
- ✅ Docker Compose for local development
- ✅ GitHub Actions CI/CD pipeline
- ✅ Code quality tools (ESLint, Prettier, Husky)
- ✅ Git hooks for pre-commit validation
- ✅ Automatic Backstage catalog registration
- ✅ TechDocs documentation support

### Optional Features (User Selectable)
- 🔲 PostgreSQL database integration (with Knex.js)
- 🔲 Redis caching support
- 🔲 Prometheus metrics endpoint
- 🔲 Grafana dashboard configuration
- 🔲 Sentry error tracking
- 🔲 Multiple deployment targets (Kubernetes, Docker Swarm, Cloud Run, ECS)
- 🔲 Configurable Node.js version (18.x, 20.x, 22.x)
- 🔲 Configurable service port

## Template Parameters

### Required Parameters

| Parameter | Type | Description | Validation |
|-----------|------|-------------|------------|
| `name` | string | Service name | Lowercase, hyphens, 2-50 chars |
| `description` | string | Service description | Max 200 characters |
| `owner` | string | Team or user owner | From Backstage catalog |
| `repoUrl` | RepoUrl | GitHub repository URL | ikto-cma-cgm organization |

### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `system` | string | - | System assignment (optional) |
| `port` | number | 3000 | Service port (1024-65535) |
| `nodeVersion` | string | 18.x | Node.js version (18.x/20.x/22.x) |
| `defaultBranch` | string | main | Default git branch |
| `includeDatabase` | boolean | false | Include PostgreSQL |
| `includeRedis` | boolean | false | Include Redis |
| `enableCICD` | boolean | true | Include GitHub Actions |
| `enableDocker` | boolean | true | Include Docker configs |
| `deploymentTarget` | string | kubernetes | Deployment platform |
| `enablePrometheus` | boolean | true | Prometheus metrics |
| `enableGrafana` | boolean | true | Grafana dashboards |
| `enableSentry` | boolean | false | Sentry error tracking |
| `logLevel` | string | info | Default log level |

## Template Actions

### 1. fetch:template
Fetches template from skeleton/ directory and processes Nunjucks variables.

**Configuration**:
- URL: `./skeleton`
- Templating: Nunjucks
- Excludes: Images, workflows (copied without templating)

### 2. publish:github
Creates GitHub repository and pushes initial commit.

**Configuration**:
- Host: github.com
- Organization: ikto-cma-cgm
- Visibility: internal
- Features: Delete branch on merge enabled
- Author: From user entity

### 3. catalog:register
Registers the new service in Backstage catalog.

**Configuration**:
- Path: `/catalog-info.yaml`
- Auto-refresh enabled

### 4. github:issues:label:create
Creates standard issue labels in repository.

**Labels**:
- bug, enhancement, documentation, security, dependencies, good-first-issue

## Generated Service Structure

When a developer creates a service, they get:

```
my-new-service/
├── src/
│   ├── config/
│   │   ├── config.js              # Configuration management
│   │   └── logger.js              # Winston logger setup
│   ├── middleware/
│   │   ├── errorHandler.js        # Global error handler
│   │   ├── rateLimiter.js         # Rate limiting
│   │   ├── requestLogger.js       # Request logging
│   │   └── validator.js           # Request validation
│   ├── routes/
│   │   ├── api.routes.js          # Main API router
│   │   ├── health.routes.js       # Health checks
│   │   ├── swagger.routes.js      # API docs
│   │   └── example.routes.js      # Example endpoints
│   ├── controllers/               # Business logic (empty)
│   ├── models/                    # Data models (empty)
│   └── index.js                   # Application entry
├── docs/
│   ├── index.md                   # TechDocs home
│   ├── getting-started/
│   ├── architecture/
│   ├── api/
│   └── deployment/
├── .github/workflows/
│   └── ci.yml                     # CI/CD pipeline
├── catalog-info.yaml              # Backstage metadata
├── package.json                   # Dependencies
├── README.md                      # Service documentation
├── Dockerfile                     # Container image
├── docker-compose.yml             # Local dev environment
├── .env.example                   # Environment template
├── openapi.yaml                   # API specification
├── mkdocs.yml                     # TechDocs config
├── .eslintrc.json                 # ESLint config
├── .prettierrc                    # Prettier config
└── .gitignore                     # Git ignore rules
```

## Nunjucks Variables Used

| Variable | Description | Example |
|----------|-------------|---------|
| `${{ values.name }}` | Service name | `user-management-service` |
| `${{ values.description }}` | Service description | `Manages user accounts` |
| `${{ values.owner }}` | Owner team/user | `platform-team` |
| `${{ values.system }}` | System assignment | `platform-services` |
| `${{ values.port }}` | Service port | `3000` |
| `${{ values.nodeVersion }}` | Node.js version | `18.x` |
| `${{ values.destination.owner }}` | GitHub owner | `ikto-cma-cgm` |
| `${{ values.destination.repo }}` | Repository name | `user-management-service` |
| `${{ values.timestamp }}` | Creation timestamp | ISO date |
| `${{ values.year }}` | Current year | `2025` |

### Conditional Variables

```nunjucks
{%- if values.includeDatabase %}
  # Database configuration included
{%- endif %}

{%- if values.enablePrometheus %}
  # Metrics endpoint enabled
{%- endif %}
```

## Dependencies

### Template Creation Requires
- Backstage with scaffolder v1beta3
- GitHub integration configured
- GitHub token with permissions: repo, workflow
- Node.js 18+ (for generated services)

### Generated Services Include

**Production Dependencies**:
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "dotenv": "^16.3.1",
  "morgan": "^1.10.0",
  "winston": "^3.11.0",
  "express-rate-limit": "^7.1.5",
  "swagger-ui-express": "^5.0.0",
  "joi": "^17.11.0"
}
```

**Optional Dependencies** (based on selections):
- `prom-client` - Prometheus metrics
- `@sentry/node` - Error tracking
- `pg`, `knex` - PostgreSQL database
- `redis` - Redis caching

**Dev Dependencies**:
```json
{
  "nodemon": "^3.0.2",
  "eslint": "^8.55.0",
  "prettier": "^3.1.1",
  "husky": "^8.0.3",
  "lint-staged": "^15.2.0"
}
```

## Registration in Backstage

### Method 1: Configuration File (Recommended)
```yaml
# app-config.local.yaml
catalog:
  locations:
    - type: url
      target: https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml
      rules:
        - allow: [Template]
```

### Method 2: Catalog Import UI
1. Go to http://localhost:7001/catalog-import
2. Enter URL: `https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml`
3. Click Import

### Required GitHub Configuration
```yaml
integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}

scaffolder:
  github:
    token: ${GITHUB_TOKEN}
    visibility: internal
```

## Usage Workflow

### Developer Experience
1. Navigate to http://localhost:7001/create
2. Select "Node.js Microservice" template
3. Fill interactive form (5 minutes)
4. Click "Create" button
5. Wait 30-60 seconds for scaffolding
6. Receive links to:
   - GitHub repository
   - Backstage catalog entry
   - CI/CD pipeline
7. Clone repository and start developing

### What Happens Behind the Scenes
1. Backstage validates form inputs
2. Scaffolder runs `fetch:template` action
3. Nunjucks processes all variables in skeleton files
4. `publish:github` creates repository on GitHub
5. Initial commit is pushed
6. `catalog:register` adds service to Backstage
7. GitHub labels are created
8. User receives success notification with links

## Validation

Run validation script:
```bash
cd /Users/mak/workspace/ikki/cma/services/applications/node-service-template
./validate-template.sh
```

**Checks**:
- ✅ Template structure completeness
- ✅ Skeleton files existence
- ✅ YAML syntax validation
- ✅ Required template sections
- ✅ Nunjucks variable usage
- ✅ Scaffolder actions configuration
- ✅ Documentation completeness
- ✅ Security checks (no hardcoded secrets)

## Documentation Files

| File | Audience | Purpose |
|------|----------|---------|
| **README.md** | Everyone | Template overview and quick links |
| **QUICK_START.md** | Beginners | 5-minute setup guide |
| **TEMPLATE_USAGE.md** | Developers | Detailed usage instructions |
| **INTEGRATION_GUIDE.md** | Platform Engineers | Setup and configuration guide |
| **TEMPLATE_SUMMARY.md** | Technical | Complete technical reference (this file) |
| **CHANGELOG.md** | Maintainers | Version history and changes |
| **app-config.template.yaml** | Platform Engineers | Backstage configuration example |

## Customization

### Modify Template Parameters
Edit `template.yaml`:
```yaml
parameters:
  - properties:
      myNewParameter:
        title: My New Parameter
        type: string
        default: value
```

### Modify Skeleton Files
Edit files in `skeleton/` directory using Nunjucks syntax:
```
${{ values.myNewParameter }}
```

### Add New Scaffolder Actions
Edit `template.yaml` steps section:
```yaml
steps:
  - id: my-action
    name: My Custom Action
    action: my:custom:action
    input:
      param: ${{ parameters.value }}
```

## Testing

### Local Testing
```bash
# 1. Validate syntax
./validate-template.sh

# 2. Test in local Backstage
# Add to app-config.local.yaml:
catalog:
  locations:
    - type: url
      target: file:///Users/mak/workspace/ikki/cma/services/applications/node-service-template/template.yaml
      rules:
        - allow: [Template]

# 3. Create test service
# Use Backstage UI to create with test values

# 4. Verify generated service
git clone <test-repo>
cd <test-repo>
npm install
npm run dev
```

## Troubleshooting

### Common Issues

**Template not appearing**:
- Check app-config.yaml configuration
- Verify GitHub token is set
- Check Backstage logs
- Force catalog refresh

**Creation fails**:
- Verify GitHub permissions
- Check repository doesn't already exist
- Validate template syntax
- Review scaffolder logs

**Generated service errors**:
- Check Node.js version compatibility
- Verify dependencies install correctly
- Review .env configuration
- Check port availability

## Maintenance

### Update Workflow
1. Make changes to template.yaml or skeleton/
2. Run `./validate-template.sh`
3. Test in local Backstage
4. Update CHANGELOG.md
5. Commit and push
6. Backstage auto-refreshes (or force refresh)

### Version Management
- Follow semantic versioning
- Update version in metadata
- Document breaking changes
- Maintain backward compatibility when possible

## Metrics and Monitoring

Track template usage:
- Number of services created
- Most used optional features
- Common configuration patterns
- Error rates during scaffolding
- Time to first commit after creation

## Support

- **Template Issues**: https://github.com/ikto-cma-cgm/node-service-template/issues
- **Platform Team**: Slack or email
- **Backstage Docs**: https://backstage.io/docs/features/software-templates

## Summary Statistics

- **Template Lines of Code**: ~500 lines (template.yaml)
- **Skeleton Files**: 50+ files
- **Documentation**: 2500+ lines across 7 files
- **Parameters**: 18 configurable options
- **Scaffolder Actions**: 4 actions
- **Generated Service LOC**: ~1000 lines ready to use
- **Time to Create Service**: ~30-60 seconds
- **Developer Time Saved**: ~4-8 hours per service

---

**Version**: 1.0.0
**Last Updated**: 2025-12-12
**Maintained By**: Platform Team
**License**: MIT
