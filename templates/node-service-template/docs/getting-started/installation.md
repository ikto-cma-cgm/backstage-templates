# Installation

This guide will help you set up the Node Service Template on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Git**
- **Docker** (optional, for containerized deployment)

## Verify Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Docker version (optional)
docker --version
```

## Clone the Repository

```bash
git clone https://github.com/your-org/node-service-template.git
cd node-service-template
```

## Install Dependencies

```bash
npm install
```

This will install all required dependencies defined in `package.json`.

## Set Up Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug

# CORS
CORS_ORIGIN=*

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Service Metadata
SERVICE_NAME=node-service-template
SERVICE_VERSION=1.0.0
```

## Install Git Hooks

Set up Husky for pre-commit hooks:

```bash
npm run prepare
```

This will configure:
- Code formatting with Prettier
- Linting with ESLint
- Automated validation before commits

## Verify Installation

Start the development server:

```bash
npm run dev
```

You should see:

```
Server started on port 3000
Environment: development
Health check available at http://localhost:3000/health
API documentation available at http://localhost:3000/api-docs
```

## Test the Installation

Open your browser or use curl to test:

```bash
# Health check
curl http://localhost:3000/health

# API root
curl http://localhost:3000/api/v1

# API documentation
open http://localhost:3000/api-docs
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, change the `PORT` variable in your `.env` file:

```env
PORT=3001
```

### Module Not Found Errors

Ensure you're using Node.js v18+ and ES modules are supported:

```bash
node --version
# Should output v18.0.0 or higher
```

### Permission Errors

On Unix-based systems, you might need to adjust permissions:

```bash
chmod +x node_modules/.bin/*
```

## Next Steps

- [Configuration Guide](configuration.md)
- [Running Locally](running-locally.md)
