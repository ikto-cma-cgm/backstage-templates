# Running Locally

This guide walks you through running the Node Service Template on your local development machine.

## Prerequisites Check

Before starting, verify you have the required tools:

```bash
# Check Node.js version (should be 18.x or higher)
node --version

# Check npm version (should be 9.x or higher)
npm --version

# Check Git
git --version
```

## First Time Setup

### 1. Clone and Install

```bash
# Navigate to project directory
cd /path/to/node-service-template

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit with your preferred editor
nano .env  # or vim, code, etc.
```

Minimal configuration for local development:
```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
```

### 3. Install Git Hooks

```bash
npm run prepare
```

This sets up Husky hooks for automatic code formatting and linting on commit.

## Starting the Service

### Development Mode (Recommended)

Development mode includes hot-reloading with nodemon:

```bash
npm run dev
```

You should see:
```
[nodemon] starting `node src/index.js`
2024-01-15 10:30:00 [info]: Server started on port 3000
2024-01-15 10:30:00 [info]: Environment: development
2024-01-15 10:30:00 [info]: Health check available at http://localhost:3000/health
2024-01-15 10:30:00 [info]: API documentation available at http://localhost:3000/api-docs
```

Changes to source files will automatically restart the server.

### Production Mode

Run in production mode (no hot-reloading):

```bash
npm start
```

## Verify Installation

### 1. Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "service": "node-service-template",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 5.123
}
```

### 2. API Root

```bash
curl http://localhost:3000/api/v1
```

### 3. Example Endpoint

```bash
curl http://localhost:3000/api/v1/examples
```

### 4. API Documentation

Open in browser:
```bash
# macOS
open http://localhost:3000/api-docs

# Linux
xdg-open http://localhost:3000/api-docs

# Windows
start http://localhost:3000/api-docs
```

## Development Workflow

### Making Changes

1. Edit source files in `src/`
2. Server automatically restarts (in dev mode)
3. Test changes immediately

### Testing Endpoints

Use curl, Postman, or the Swagger UI:

```bash
# GET request
curl http://localhost:3000/api/v1/examples

# POST request
curl -X POST http://localhost:3000/api/v1/examples \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Example","status":"active"}'

# PUT request
curl -X PUT http://localhost:3000/api/v1/examples/123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Example"}'

# DELETE request
curl -X DELETE http://localhost:3000/api/v1/examples/123
```

### Viewing Logs

Logs are output to console with colored formatting in development:

```
2024-01-15 10:30:00 [info]: Server started on port 3000
2024-01-15 10:30:15 [info]: HTTP Request {"method":"GET","url":"/health","statusCode":200,"duration":"5ms"}
2024-01-15 10:30:20 [warn]: Rate limit exceeded {"ip":"127.0.0.1","path":"/api/v1/examples"}
2024-01-15 10:30:25 [error]: Error caught by error handler {"error":"Resource not found"}
```

## Code Quality Tools

### Linting

Check code for issues:
```bash
npm run lint
```

Auto-fix issues:
```bash
npm run lint:fix
```

### Formatting

Format all code:
```bash
npm run format
```

Check formatting without changes:
```bash
npm run format:check
```

### Validate Everything

Run all quality checks:
```bash
npm run validate
```

This runs:
- Format checking
- Linting

## Debugging

### Node.js Debugger

Add `debugger` statements in your code, then run:

```bash
node --inspect src/index.js
```

Attach with:
- Chrome DevTools: Open `chrome://inspect`
- VS Code: Use the debug panel with Node.js configuration

### VS Code Launch Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Node App",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/index.js",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
```

### Logging Levels

Adjust log verbosity in `.env`:

```env
# See all debug messages
LOG_LEVEL=debug

# Only important info
LOG_LEVEL=info

# Warnings and errors only
LOG_LEVEL=warn

# Errors only
LOG_LEVEL=error
```

## Using Different Ports

If port 3000 is already in use:

1. Change in `.env`:
   ```env
   PORT=3001
   ```

2. Or set temporarily:
   ```bash
   PORT=3001 npm run dev
   ```

## Stopping the Service

### Graceful Shutdown

Press `Ctrl+C` in the terminal. The service will:
1. Stop accepting new connections
2. Finish processing active requests
3. Close server cleanly
4. Exit process

### Force Stop

If the service doesn't stop:
```bash
# Find the process
lsof -i :3000

# Kill it
kill -9 <PID>
```

## Common Issues

### Port Already in Use

```bash
# Find what's using the port
lsof -i :3000

# Change port or kill the process
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Permission Errors

```bash
# Fix npm permissions (avoid using sudo)
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### Git Hooks Not Working

```bash
# Reinstall hooks
npm run prepare

# Check permissions
chmod +x .husky/pre-commit
```

## Next Steps

- [API Reference](../api/overview.md)
- [Development Guide](../development/code-style.md)
- [Deployment](../deployment/docker.md)
