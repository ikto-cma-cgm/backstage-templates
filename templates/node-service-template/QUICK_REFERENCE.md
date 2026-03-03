# Quick Reference Guide

One-page reference for the Node Service Template.

## Project Location
```
/Users/mak/workspace/ikki/cma/services/applications/node-service-template/
```

## Project Stats
- **37 Files** created
- **204KB** total size
- **2000+ lines** of code
- **Production-ready** template

## Quick Commands

```bash
# Setup
npm install                    # Install dependencies
cp .env.example .env          # Create environment file
npm run prepare               # Install git hooks

# Development
npm run dev                   # Start with hot reload
npm start                     # Start production mode

# Code Quality
npm run lint                  # Check code
npm run lint:fix              # Fix issues
npm run format                # Format code
npm run validate              # Run all checks

# Docker
npm run docker:build          # Build image
npm run docker:run            # Start containers
npm run docker:stop           # Stop containers
docker-compose logs -f        # View logs

# Utilities
./scripts/setup.sh            # Automated setup
```

## Key URLs (Local Development)

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | API Root |
| http://localhost:3000/health | Health Check |
| http://localhost:3000/health/ready | Readiness Probe |
| http://localhost:3000/health/live | Liveness Probe |
| http://localhost:3000/api/v1 | API Base |
| http://localhost:3000/api/v1/examples | Example Endpoints |
| http://localhost:3000/api-docs | Swagger UI |

## Project Structure

```
.
├── src/                          # Application code
│   ├── config/                  # Configuration
│   │   ├── config.js           # Environment config
│   │   └── logger.js           # Winston logger
│   ├── middleware/             # Express middleware
│   │   ├── errorHandler.js    # Error handling
│   │   ├── rateLimiter.js     # Rate limiting
│   │   ├── requestLogger.js   # Request logging
│   │   └── validator.js       # Input validation
│   ├── routes/                 # API routes
│   │   ├── api.routes.js      # Main router
│   │   ├── example.routes.js  # Example CRUD
│   │   ├── health.routes.js   # Health checks
│   │   └── swagger.routes.js  # API documentation
│   └── index.js                # Entry point
│
├── docs/                        # TechDocs
│   ├── getting-started/        # Setup guides
│   ├── architecture/           # Architecture docs
│   └── index.md                # Documentation home
│
├── .github/workflows/          # CI/CD
│   └── ci.yml                  # GitHub Actions
│
├── scripts/                     # Utility scripts
│   └── setup.sh                # Setup automation
│
├── catalog-info.yaml           # Backstage catalog
├── openapi.yaml                # API specification
├── Dockerfile                  # Docker image
├── docker-compose.yml          # Local orchestration
├── package.json                # NPM config
├── mkdocs.yml                  # TechDocs config
│
├── .env.example                # Environment template
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── .gitignore                  # Git ignore
├── .dockerignore               # Docker ignore
│
├── README.md                   # Quick start
├── CONTRIBUTING.md             # Contribution guide
├── PROJECT_OVERVIEW.md         # Detailed overview
├── SETUP_SUMMARY.md            # Setup summary
├── BACKSTAGE_INTEGRATION.md    # Integration guide
└── QUICK_REFERENCE.md          # This file
```

## Environment Variables (Essential)

```env
NODE_ENV=development              # Environment
PORT=3000                        # Server port
LOG_LEVEL=debug                  # Logging level
CORS_ORIGIN=*                    # CORS origins
RATE_LIMIT_WINDOW_MS=900000      # Rate limit window
RATE_LIMIT_MAX_REQUESTS=100      # Max requests
```

## API Endpoints

### Health
```bash
GET /health              # Basic health
GET /health/ready        # Readiness
GET /health/live         # Liveness
```

### Examples (CRUD)
```bash
GET    /api/v1/examples     # List all
GET    /api/v1/examples/:id # Get one
POST   /api/v1/examples     # Create
PUT    /api/v1/examples/:id # Update
DELETE /api/v1/examples/:id # Delete
```

## Request Examples

### GET Request
```bash
curl http://localhost:3000/api/v1/examples
```

### POST Request
```bash
curl -X POST http://localhost:3000/api/v1/examples \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","status":"active"}'
```

### PUT Request
```bash
curl -X PUT http://localhost:3000/api/v1/examples/123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated"}'
```

### DELETE Request
```bash
curl -X DELETE http://localhost:3000/api/v1/examples/123
```

## Response Format

### Success
```json
{
  "success": true,
  "data": { /* ... */ }
}
```

### Error
```json
{
  "success": false,
  "error": "Error message"
}
```

## Git Workflow

```bash
# Feature branch
git checkout -b feature/new-feature

# Make changes
# Commits automatically validated by pre-commit hook

git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create Pull Request
```

## Commit Message Format

```
<type>(<scope>): <subject>

feat: New feature
fix: Bug fix
docs: Documentation
style: Formatting
refactor: Code refactoring
perf: Performance
chore: Maintenance
```

## Docker Commands

```bash
# Build
docker build -t node-service-template .

# Run
docker run -p 3000:3000 --env-file .env node-service-template

# Compose
docker-compose up -d
docker-compose down
docker-compose logs -f
docker-compose restart

# Clean
docker system prune -af
```

## Backstage Integration

### Register Service
1. Push to Git
2. Go to Backstage UI
3. Create → Register Component
4. Enter catalog-info.yaml URL
5. Import

### View in Backstage
- **Catalog**: Browse services
- **API**: View OpenAPI spec
- **Docs**: Read TechDocs
- **Dependencies**: See relationships

## Common Issues

### Port in Use
```bash
lsof -i :3000
kill -9 <PID>
# Or change PORT in .env
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Git Hooks Fail
```bash
npm run prepare
chmod +x .husky/pre-commit
```

### Docker Build Fails
```bash
docker system prune -af
docker-compose build --no-cache
```

## Code Style

### Imports
```javascript
// External first
import express from 'express';
import cors from 'cors';

// Internal second
import { config } from './config/config.js';
import { logger } from './config/logger.js';
```

### Async/Await
```javascript
export const myFunction = async (req, res) => {
  const result = await someOperation();
  res.json({ success: true, data: result });
};
```

### Error Handling
```javascript
throw new AppError('Error message', 400);
```

### Logging
```javascript
logger.info('Message', { key: 'value' });
logger.error('Error', { error: error.message });
```

## Validation

```javascript
import Joi from 'joi';
import { validate } from '../middleware/validator.js';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
});

router.post('/', validate(schema), handler);
```

## Documentation Files

| File | Purpose |
|------|---------|
| README.md | Quick start guide |
| PROJECT_OVERVIEW.md | Detailed project info |
| SETUP_SUMMARY.md | Complete setup guide |
| CONTRIBUTING.md | Contribution guidelines |
| BACKSTAGE_INTEGRATION.md | Backstage integration |
| QUICK_REFERENCE.md | This quick reference |

## File Locations

```
Config:      src/config/
Middleware:  src/middleware/
Routes:      src/routes/
Docs:        docs/
API Spec:    openapi.yaml
Catalog:     catalog-info.yaml
Docker:      Dockerfile, docker-compose.yml
CI/CD:       .github/workflows/
```

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Language**: JavaScript (ES2022+)
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston, Morgan
- **Validation**: Joi
- **Docs**: OpenAPI 3.0, MkDocs
- **Quality**: ESLint, Prettier, Husky
- **Container**: Docker, Docker Compose

## Port Configuration

Default: 3000

Change in `.env`:
```env
PORT=3001
```

Or temporarily:
```bash
PORT=3001 npm run dev
```

## Logging Levels

```env
LOG_LEVEL=debug   # All messages
LOG_LEVEL=info    # Info and above
LOG_LEVEL=warn    # Warnings and errors
LOG_LEVEL=error   # Errors only
```

## Rate Limiting

Default: 100 requests per 15 minutes

Change in `.env`:
```env
RATE_LIMIT_WINDOW_MS=900000     # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100     # Max requests
```

## Health Check Details

### GET /health
```json
{
  "success": true,
  "status": "healthy",
  "service": "node-service-template",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.5
}
```

### GET /health/ready
```json
{
  "success": true,
  "status": "ready",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /health/live
```json
{
  "success": true,
  "status": "alive",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Support Contacts

- **Documentation**: See docs/ folder
- **Issues**: GitHub Issues
- **Questions**: Platform Team
- **Backstage**: http://localhost:7007

## Version

**Current Version**: 1.0.0
**Last Updated**: 2024-12-12
**Status**: Production Ready

---

**Quick Tip**: Bookmark this page for instant reference!
