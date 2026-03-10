# React/Next.js Application Template

This documentation provides comprehensive information about the React/Next.js application template used in the CMA-CGM Developer Platform.

## Overview

This template generates a modern React/Next.js application with TypeScript, Tailwind CSS, and best practices. It includes:
- Production-ready examples and best practices
- TypeScript for type safety
- Tailwind CSS for styling
- Authentication with NextAuth.js (optional)
- API client with React Query (optional)
- State management (optional)
- Progressive Web App (PWA) support (optional)
- Internationalization (i18n) support (optional)
- Docker and Docker Compose support
- Code quality tools (ESLint, Prettier)
- Backstage Software Catalog integration

## Getting Started

### Prerequisites

- Node.js >= ${{ values.nodeVersion }}
- npm >= 9.0.0
- Docker (optional, for containerized development)

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit:
- Application: http://localhost:${{ values.port }}

## Project Structure

```
.
??? app/                # Next.js App Router pages and layouts
?   ??? layout.tsx      # Root layout
?   ??? page.tsx        # Home page
?   ??? ...
??? components/         # React components
?   ??? ui/             # UI components
?   ??? ...
??? lib/                # Utilities and API client
?   ??? api/            # API client setup
??? public/             # Static assets
??? catalog-info.yaml   # Backstage catalog metadata
??? Dockerfile          # Docker configuration
??? docker-compose.yml  # Docker Compose configuration
??? tailwind.config.js  # Tailwind CSS configuration
??? tsconfig.json       # TypeScript configuration
??? package.json        # NPM configuration
```

## Features

- Next.js ${{ values.nodeVersion }} with App Router
- TypeScript for type safety
- Tailwind CSS for styling
{%- if values.uiLibrary != 'none' %}
- ${{ values.uiLibrary }} UI component library
{%- endif %}
{%- if values.includeAuth %}
- Authentication with NextAuth.js
{%- endif %}
{%- if values.includeAPI %}
- API client with React Query
{%- endif %}
{%- if values.includeStateManagement != 'none' %}
- State management with ${{ values.includeStateManagement }}
{%- endif %}
{%- if values.includeAnimations %}
- Animations with Framer Motion
{%- endif %}
{%- if values.includePWA %}
- Progressive Web App (PWA) support
{%- endif %}
{%- if values.includeI18n %}
- Internationalization (i18n) support
{%- endif %}
{%- if values.enableDocker %}
- Docker and Docker Compose support
{%- endif %}
- Code quality tools (ESLint, Prettier)
- Backstage Software Catalog integration
{%- if values.enableSentry %}
- Sentry error tracking integration
{%- endif %}
{%- if values.enableAnalytics %}
- Analytics tracking setup
{%- endif %}

## Development

### Available Scripts

| Command              | Description                                |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Start development server with hot reload   |
| `npm run build`      | Create production build                    |
| `npm start`          | Start production server                    |
| `npm run lint`       | Run ESLint                                 |
| `npm run lint:fix`   | Fix ESLint errors automatically            |
{%- if values.enableDocker %}
| `npm run docker:build` | Build Docker image                       |
| `npm run docker:run` | Start services with Docker Compose         |
{%- endif %}

### Code Quality

#### Linting

ESLint is configured for code quality:

```bash
npm run lint
npm run lint:fix
```

#### Formatting

Prettier is configured for consistent code formatting. Files are automatically formatted on save (if your editor is configured).

## Deployment

### Vercel

This application is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel dashboard
3. Configure environment variables
4. Deploy!

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Netlify

This application can be deployed to Netlify:

1. Push your code to GitHub
2. Import the project in Netlify dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Configure environment variables
5. Deploy!

### Kubernetes

Kubernetes manifests are provided for deployment:

```bash
kubectl apply -f k8s/
```

Ensure you configure:
- ConfigMaps for environment variables
- Secrets for sensitive data
- Service and Ingress for networking
- HorizontalPodAutoscaler for scaling

## Backstage Integration

This application is fully integrated with Backstage:

1. **Software Catalog**: Defined in `catalog-info.yaml`
2. **Metadata**: Tags, links, and ownership information
3. **CI/CD**: GitHub Actions integration

The application is automatically registered in Backstage catalog.

## Contributing

1. Create a feature branch from `${{ values.defaultBranch }}`
2. Make your changes
3. Ensure code passes linting and testing
4. Update documentation if needed
5. Submit a pull request

## License

MIT

## Support

For questions and support, contact **${{ values.owner }}** or the Platform Team.
