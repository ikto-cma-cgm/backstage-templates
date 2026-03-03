# Node Service Template

Welcome to the Node Service Template documentation! This is a production-ready Node.js microservice template with industry best practices, comprehensive monitoring, and seamless Backstage integration.

## Features

- **Modern Node.js Stack**: Built with Express.js and ES modules
- **Production-Ready**: Includes logging, error handling, rate limiting, and security headers
- **API Documentation**: Integrated Swagger/OpenAPI documentation
- **Health Checks**: Kubernetes-ready liveness and readiness probes
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks
- **Monitoring**: Structured logging with Winston, ready for observability integrations
- **Backstage Integration**: Full Software Catalog and TechDocs support
- **Docker Support**: Dockerfile and docker-compose for easy deployment

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Install git hooks
npm run prepare

# Start development server
npm run dev

# Open API documentation
open http://localhost:3000/api-docs
```

## Project Structure

```
.
├── src/
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   └── models/          # Data models
├── docs/               # TechDocs documentation
├── tests/              # Test files (managed by quality service)
├── catalog-info.yaml   # Backstage service catalog
├── openapi.yaml        # OpenAPI specification
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
└── package.json        # NPM dependencies and scripts
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run validate` - Run all validation checks

## Next Steps

- [Installation Guide](getting-started/installation.md)
- [Configuration](getting-started/configuration.md)
- [API Reference](api/overview.md)
- [Deployment Guide](deployment/docker.md)

## Support

For questions and support, please contact the Platform Team or visit our internal documentation portal.
