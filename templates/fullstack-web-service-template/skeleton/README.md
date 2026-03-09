# ${{ values.name }}

> ${{ values.description }}

## 🏗️ Architecture

This is a **full-stack monorepo** containing both frontend and backend applications that work together to provide a complete web service.

```
${{ values.name }}/
├── apps/
│   ├── frontend/          # React/Next.js Application
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React components
│   │   ├── public/        # Static assets
│   │   └── package.json
│   │
│   └── backend/           # Node.js/Express API
│       ├── src/
│       │   ├── routes/    # API routes
│       │   ├── controllers/
│       │   ├── models/
│       │   └── services/
│       └── package.json
│
├── package.json           # Workspace configuration
├── .env.example           # Environment variables template
└── ARCHITECTURE.md        # Detailed architecture docs
```

## 🚀 Quick Start

### Prerequisites

- Node.js ${{ values.nodeVersion }} or higher
- npm 8.0.0 or higher
{% if values.includeDatabase %}- PostgreSQL (for database){% endif %}
{% if values.includeRedis %}- Redis (for caching){% endif %}

### Installation

1. **Clone the repository:**
   ```bash
   git clone ${{ values.repoUrl }}
   cd ${{ values.name }}
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install dependencies for both frontend and backend using npm workspaces.

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```
   This starts both the frontend and backend in parallel.

### Access the Application

- **Frontend**: [http://localhost:${{ values.frontendPort }}](http://localhost:${{ values.frontendPort }})
- **Backend API**: [http://localhost:${{ values.backendPort }}/api/v1](http://localhost:${{ values.backendPort }}/api/v1)
- **Health Check**: [http://localhost:${{ values.backendPort }}/health](http://localhost:${{ values.backendPort }}/health)
- **API Documentation**: [http://localhost:${{ values.backendPort }}/api-docs](http://localhost:${{ values.backendPort }}/api-docs)

## 📜 Available Scripts

### Monorepo Scripts (Root Level)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run build` | Build both applications for production |
| `npm run test` | Run tests for both applications |
| `npm run lint` | Lint both applications |
| `npm run format` | Format code in both applications |
| `npm run clean` | Clean all node_modules and build artifacts |

### Frontend-Only Scripts

```bash
cd apps/frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run test:e2e     # Run E2E tests
npm run lint         # Lint code
```

### Backend-Only Scripts

```bash
cd apps/backend
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Lint code
```

## 🔧 Configuration

### Frontend Configuration

The frontend is configured to communicate with the backend via environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:${{ values.backendPort }}/api/v1
```

### Backend Configuration

Key environment variables for the backend:

```env
NODE_ENV=development
PORT=${{ values.backendPort }}
{% if values.includeDatabase %}DATABASE_URL=postgresql://user:password@localhost:5432/${{ values.name }}{% endif %}
{% if values.includeRedis %}REDIS_URL=redis://localhost:6379{% endif %}
CORS_ORIGIN=http://localhost:${{ values.frontendPort }}
```

## 🏛️ Architecture Overview

### Frontend (React/Next.js)

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **API Client**: Configured fetch with base URL from env
- **Testing**: Vitest + Playwright

### Backend (Node.js/Express)

- **Framework**: Express.js with TypeScript
- **API Style**: RESTful API
{% if values.includeDatabase %}- **Database**: PostgreSQL with migrations{% endif %}
{% if values.includeRedis %}- **Caching**: Redis{% endif %}
- **Documentation**: OpenAPI/Swagger
- **Testing**: Jest/Vitest

### Communication

The frontend communicates with the backend via:
- RESTful HTTP requests to `/api/v1/*` endpoints
- CORS is configured to allow requests from the frontend origin
- Environment variables control the API base URL

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Frontend Tests
```bash
cd apps/frontend
npm run test              # Unit tests
npm run test:e2e          # E2E tests with Playwright
npm run test:coverage     # Coverage report
```

### Backend Tests
```bash
cd apps/backend
npm test                  # Unit + integration tests
npm run test:watch        # Watch mode
```

## 🚢 Deployment

### Option 1: Deploy Frontend and Backend Separately

**Frontend (Vercel):**
```bash
cd apps/frontend
vercel deploy
```

**Backend (Cloud Run, Kubernetes, etc.):**
```bash
cd apps/backend
# Build Docker image
docker build -t ${{ values.name }}-backend .
# Deploy to your platform
```

### Option 2: Deploy as Monorepo

Many platforms support monorepo deployments:
- Configure build paths in deployment platform
- Frontend: `apps/frontend`
- Backend: `apps/backend`

{% if values.enableCICD %}
## 🔄 CI/CD

GitHub Actions workflows are configured to:
- ✅ Run tests on pull requests
- ✅ Lint code
- ✅ Build both applications
{% if values.enableDocker %}- ✅ Build and push Docker images{% endif %}
- ✅ Deploy on merge to main

See `.github/workflows/` for pipeline configurations.
{% endif %}

## 📦 Dependencies Management

This monorepo uses **npm workspaces** to manage dependencies:

- Shared dependencies can be installed at the root
- Application-specific dependencies go in each app's `package.json`
- Run `npm install` at the root to install all dependencies

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Commit: `git commit -m "feat: add my feature"`
6. Push and create a Pull Request

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Backstage Catalog]({{ values.destination.host }})

## 📄 License

UNLICENSED - Proprietary software for internal use only.

## 👥 Team

**Owner**: ${{ values.owner }}

For questions or support, contact the Platform Team.
