# Architecture Documentation

## Overview

This full-stack application is built as a **monorepo** containing two main applications:
- **Frontend**: React/Next.js web application
- **Backend**: Node.js/Express REST API

## Architecture Diagram

```mermaid
graph TB
    subgraph "User Device"
        Browser[Web Browser]
    end

    subgraph "Frontend - apps/frontend"
        NextJS[Next.js Application<br/>Port: ${{ values.frontendPort }}]
        Components[React Components]
        API_Client[API Client]
    end

    subgraph "Backend - apps/backend"
        Express[Express Server<br/>Port: ${{ values.backendPort }}]
        Routes[API Routes /api/v1]
        Controllers[Controllers]
        Services[Business Logic]
        {% if values.includeDatabase %}DB_Layer[Database Layer]{% endif %}
    end

    {% if values.includeDatabase %}
    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL<br/>Database)]
        {% if values.includeRedis %}Redis[(Redis<br/>Cache)]{% endif %}
    end
    {% endif %}

    Browser -->|HTTP| NextJS
    NextJS --> Components
    Components --> API_Client
    API_Client -->|REST API| Express
    Express --> Routes
    Routes --> Controllers
    Controllers --> Services
    {% if values.includeDatabase %}
    Services --> DB_Layer
    DB_Layer --> PostgreSQL
    {% if values.includeRedis %}Services --> Redis{% endif %}
    {% endif %}
```

## Technology Stack

### Frontend (`apps/frontend`)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 | React framework with SSR/SSG |
| **UI Library** | React 19 | Component-based UI |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Language** | TypeScript | Type-safe JavaScript |
| **Testing** | Vitest + Playwright | Unit and E2E testing |
| **Linting** | ESLint | Code quality |
| **Formatting** | Prettier | Code formatting |

### Backend (`apps/backend`)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Express.js | Web framework |
| **Language** | TypeScript | Type-safe JavaScript |
| **Runtime** | Node.js ${{ values.nodeVersion }} | JavaScript runtime |
{% if values.includeDatabase %}| **Database** | PostgreSQL | Relational database |{% endif %}
{% if values.includeRedis %}| **Cache** | Redis | In-memory cache |{% endif %}
| **API Docs** | OpenAPI/Swagger | API documentation |
| **Testing** | Jest/Vitest | Unit testing |
| **Logging** | Winston | Application logging |

## Communication Flow

### Frontend → Backend

1. **Development Mode**:
   ```
   Frontend (localhost:${{ values.frontendPort }})
      ↓
   API Request to NEXT_PUBLIC_API_URL
      ↓
   Backend (localhost:${{ values.backendPort }}/api/v1)
   ```

2. **Production Mode**:
   ```
   Frontend (deployed on Vercel/CDN)
      ↓
   API Request to production API URL
      ↓
   Backend (deployed on Cloud Run/K8s/etc.)
   ```

### API Communication

- **Protocol**: HTTP/HTTPS
- **Format**: JSON
- **Base Path**: `/api/v1`
- **Authentication**: JWT tokens (if implemented)
- **CORS**: Configured to allow frontend origin

### Example API Request

```typescript
// Frontend code
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}` // if auth is enabled
  },
});
const data = await response.json();
```

## Monorepo Structure

### Workspace Configuration

The monorepo uses **npm workspaces** for dependency management:

```json
{
  "workspaces": [
    "apps/frontend",
    "apps/backend"
  ]
}
```

**Benefits**:
- Single `node_modules` at root (shared dependencies)
- Atomic commits affecting both apps
- Unified CI/CD pipeline
- Simplified dependency management
- Better code sharing

### Directory Structure

```
${{ values.name }}/
│
├── apps/
│   ├── frontend/              # Next.js application
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities
│   │   ├── public/           # Static assets
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── backend/              # Express API
│       ├── src/
│       │   ├── routes/       # API routes
│       │   ├── controllers/  # Request handlers
│       │   ├── services/     # Business logic
│       │   ├── models/       # Data models
│       │   ├── middleware/   # Express middleware
│       │   └── utils/        # Utilities
│       ├── tests/            # Tests
│       ├── package.json
│       └── tsconfig.json
│
├── .github/
│   └── workflows/            # CI/CD pipelines
│
├── package.json              # Workspace root
├── .env.example
├── .gitignore
├── README.md
└── ARCHITECTURE.md (this file)
```

## Data Flow

### Example: User List Feature

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    {% if values.includeDatabase %}participant Database{% endif %}

    User->>Frontend: Visit /users page
    Frontend->>Frontend: Render loading state
    Frontend->>Backend: GET /api/v1/users
    {% if values.includeDatabase %}
    Backend->>Database: SELECT * FROM users
    Database-->>Backend: User records
    {% endif %}
    Backend-->>Frontend: JSON response
    Frontend->>Frontend: Update UI with data
    Frontend-->>User: Display users list
```

## Environment Configuration

### Frontend Environment Variables

```bash
# Public (exposed to browser)
NEXT_PUBLIC_API_URL=http://localhost:${{ values.backendPort }}/api/v1

# Private (server-side only)
API_SECRET_KEY=your-secret-key
```

### Backend Environment Variables

```bash
# Server Configuration
NODE_ENV=development
PORT=${{ values.backendPort }}
LOG_LEVEL=info

# CORS
CORS_ORIGIN=http://localhost:${{ values.frontendPort }}

{% if values.includeDatabase %}
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/${{ values.name }}
DB_POOL_MIN=2
DB_POOL_MAX=10
{% endif %}

{% if values.includeRedis %}
# Redis
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600
{% endif %}
```

## Security Considerations

### CORS Configuration

The backend is configured to accept requests from the frontend origin:

```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
```

### Environment Separation

- Development: `http://localhost:*`
- Production: Proper HTTPS domains

### Best Practices

1. **Never commit `.env` files**
2. **Use environment-specific configs**
3. **Validate all API inputs**
4. **Sanitize user data**
5. **Use HTTPS in production**
6. **Implement rate limiting**
7. **Add authentication/authorization**

## Deployment Strategies

### Strategy 1: Deploy Separately

**Frontend**: Deploy to Vercel, Netlify, or CloudFlare Pages
- Automatic builds and deployments
- Global CDN distribution
- Environment variable management

**Backend**: Deploy to Cloud Run, Kubernetes, or ECS
- Containerized deployment
- Auto-scaling
- Load balancing

### Strategy 2: Deploy Together

Use a platform that supports monorepos:
- Railway
- Render
- Fly.io

Configure build paths:
- Frontend: `apps/frontend`
- Backend: `apps/backend`

{% if values.enableDocker %}
### Docker Deployment

The project includes Docker support:

```bash
# Build images
docker build -t ${{ values.name }}-frontend apps/frontend
docker build -t ${{ values.name }}-backend apps/backend

# Run with docker-compose
docker-compose up
```
{% endif %}

## Scaling Considerations

### Horizontal Scaling

- **Frontend**: Stateless, easy to scale with CDN
- **Backend**: Stateless API, scale behind load balancer

### Performance Optimization

1. **Frontend**:
   - Code splitting
   - Image optimization
   - Static generation where possible
   - Client-side caching

2. **Backend**:
   {% if values.includeRedis %}- Redis caching for frequent queries{% endif %}
   - Database query optimization
   - Connection pooling
   - Response compression

## Testing Strategy

### Frontend Tests

- **Unit Tests**: Component logic
- **Integration Tests**: API interactions
- **E2E Tests**: User workflows

### Backend Tests

- **Unit Tests**: Business logic
- **Integration Tests**: Database operations
- **API Tests**: Endpoint responses

### Running Tests

```bash
# All tests
npm test

# Frontend only
cd apps/frontend && npm test

# Backend only
cd apps/backend && npm test
```

## Monitoring & Observability

### Logging

- **Frontend**: Browser console + error tracking
- **Backend**: Structured logging with Winston

### Health Checks

- Backend: `GET /health`
- Database: Connection pool status
{% if values.includeRedis %}- Redis: Connection status{% endif %}

### Metrics (if Prometheus enabled)

- Request rate
- Response time
- Error rate
- Resource usage

## Development Workflow

1. **Start Development**:
   ```bash
   npm install
   npm run dev
   ```

2. **Make Changes**:
   - Frontend: Edit `apps/frontend/`
   - Backend: Edit `apps/backend/`

3. **Test Changes**:
   ```bash
   npm test
   ```

4. **Commit**:
   ```bash
   git add .
   git commit -m "feat: add feature"
   git push
   ```

5. **Deploy**: CI/CD pipeline handles deployment

## Future Enhancements

Potential improvements to consider:

- [ ] Add GraphQL API layer
- [ ] Implement WebSocket support for real-time features
- [ ] Add shared TypeScript types package
- [ ] Implement micro-frontends architecture
- [ ] Add E2E testing with shared scenarios
- [ ] Implement feature flags
- [ ] Add API versioning strategy
- [ ] Implement comprehensive monitoring

## Support & Resources

- **Repository**: ${{ values.repoUrl }}
- **Team Owner**: ${{ values.owner }}
- **Documentation**: See README.md
- **API Docs**: `/api-docs` endpoint

For questions or issues, contact the Platform Team.
