# Project Structure

This document describes the organization of files and directories in the Node Service Template.

## Directory Layout

```
node-service-template/
├── .github/
│   └── workflows/           # GitHub Actions CI/CD workflows
├── docs/                    # TechDocs documentation
│   ├── getting-started/
│   ├── architecture/
│   ├── api/
│   ├── development/
│   ├── deployment/
│   └── operations/
├── src/                     # Application source code
│   ├── config/              # Configuration files
│   │   ├── config.js        # Main configuration
│   │   └── logger.js        # Logger configuration
│   ├── middleware/          # Express middleware
│   │   ├── errorHandler.js  # Error handling
│   │   ├── rateLimiter.js   # Rate limiting
│   │   ├── requestLogger.js # Request logging
│   │   └── validator.js     # Input validation
│   ├── routes/              # API routes
│   │   ├── api.routes.js    # Main API router
│   │   ├── example.routes.js# Example routes
│   │   ├── health.routes.js # Health check routes
│   │   └── swagger.routes.js# API documentation routes
│   ├── controllers/         # Route controllers (add as needed)
│   └── models/              # Data models (add as needed)
├── .env.example             # Example environment variables
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── .prettierrc              # Prettier configuration
├── catalog-info.yaml        # Backstage service catalog
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker image definition
├── mkdocs.yml               # TechDocs configuration
├── openapi.yaml             # OpenAPI specification
├── package.json             # NPM dependencies and scripts
└── README.md                # Project README

```

## Key Files

### Root Level

| File                 | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `package.json`       | NPM configuration, dependencies, scripts     |
| `catalog-info.yaml`  | Backstage Software Catalog metadata          |
| `mkdocs.yml`         | TechDocs documentation configuration         |
| `openapi.yaml`       | OpenAPI 3.0 API specification                |
| `Dockerfile`         | Docker image build instructions              |
| `docker-compose.yml` | Multi-container Docker application           |
| `.env.example`       | Example environment variables                |
| `.gitignore`         | Files to exclude from version control        |
| `.eslintrc.json`     | ESLint linting rules                         |
| `.prettierrc`        | Prettier formatting rules                    |

### Source Code (`src/`)

#### Configuration (`src/config/`)

- **`config.js`**: Central configuration management, loads environment variables
- **`logger.js`**: Winston logger setup with different formats for dev/prod

#### Middleware (`src/middleware/`)

- **`errorHandler.js`**: Centralized error handling, formats error responses
- **`rateLimiter.js`**: Rate limiting to prevent abuse
- **`requestLogger.js`**: HTTP request/response logging
- **`validator.js`**: Joi schema validation middleware

#### Routes (`src/routes/`)

- **`api.routes.js`**: Main API router, aggregates all routes
- **`example.routes.js`**: Example CRUD endpoints
- **`health.routes.js`**: Health check endpoints (/, /ready, /live)
- **`swagger.routes.js`**: Swagger UI for API documentation

#### Entry Point

- **`src/index.js`**: Application entry point, server initialization

## Conventions

### File Naming

- **Routes**: `*.routes.js` (e.g., `user.routes.js`)
- **Controllers**: `*.controller.js` (e.g., `user.controller.js`)
- **Models**: `*.model.js` (e.g., `user.model.js`)
- **Services**: `*.service.js` (e.g., `auth.service.js`)
- **Middleware**: Descriptive names (e.g., `authenticate.js`)

### Import/Export

- Use ES module syntax (`import`/`export`)
- Named exports for utilities: `export const myFunction = () => {}`
- Default exports for main entities: `export default router;`

### Code Organization

1. **Routes**: Define endpoints, delegate to controllers
2. **Controllers**: Handle request/response, call services
3. **Services**: Business logic, data operations
4. **Models**: Data structures and validation
5. **Middleware**: Cross-cutting concerns (auth, logging, etc.)

## Extending the Structure

### Adding a New Feature

1. Create routes file: `src/routes/feature.routes.js`
2. Create controller: `src/controllers/feature.controller.js`
3. Create service: `src/services/feature.service.js`
4. Create model: `src/models/feature.model.js`
5. Register route in `src/routes/api.routes.js`

Example:

```javascript
// src/routes/api.routes.js
import featureRoutes from './feature.routes.js';

router.use('/features', featureRoutes);
```

### Adding Database Integration

1. Create database config: `src/config/database.js`
2. Add models in: `src/models/`
3. Create repository pattern: `src/repositories/`
4. Update services to use repositories

### Adding Authentication

1. Create auth middleware: `src/middleware/authenticate.js`
2. Create auth service: `src/services/auth.service.js`
3. Add auth routes: `src/routes/auth.routes.js`
4. Apply middleware to protected routes

## Best Practices

- Keep routes thin, move logic to controllers/services
- Use middleware for cross-cutting concerns
- Validate all user input with Joi schemas
- Use async/await for asynchronous operations
- Handle errors consistently with AppError class
- Log important events and errors
- Keep configuration in environment variables
- Document API changes in OpenAPI spec
