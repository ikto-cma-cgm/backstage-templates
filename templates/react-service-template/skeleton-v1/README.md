# ${{ values.name | title }}

${{ values.description }}

**Generated from:** [react-service-template](https://github.com/ikto-cma-cgm/react-service-template)
**Owner:** ${{ values.owner }}
**Created:** ${{ values.timestamp }}

---

## 🎯 Best Practices Included

This project comes with **production-ready examples** demonstrating React best practices:

- 📚 **[Best Practices Guide](./BEST_PRACTICES.md)** - Comprehensive documentation
- 🎨 **[Live Examples](/examples)** - Interactive demonstrations
- 🧩 **Reusable Components** - Button, Card, Input with TypeScript
- 🪝 **Custom Hooks** - useFetch, useDebounce, useLocalStorage, useMediaQuery
- ♿ **Accessibility** - WCAG compliant, ARIA attributes, keyboard navigation
- ⚡ **Performance** - Debouncing, memoization, code splitting ready
- 🎯 **TypeScript** - Strict mode, proper types, no `any`
- 🧪 **Testing Ready** - Example test patterns included

**👉 Visit `/examples` page after starting the app to see live demonstrations!**

---

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

## Prerequisites

- Node.js >= ${{ values.nodeVersion }}
- npm >= 9.0.0
{%- if values.enableDocker %}
- Docker (optional, for containerized development)
{%- endif %}

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit:
- Application: http://localhost:${{ values.port }}

## Available Scripts

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

## Project Structure

```
.
├── app/                # Next.js App Router pages and layouts
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── ...
{%- if values.includeAPI %}
├── lib/                # Utilities and API client
│   └── api/            # API client setup
{%- endif %}
├── components/         # React components
│   ├── ui/             # UI components
│   └── ...
├── public/             # Static assets
├── catalog-info.yaml   # Backstage catalog metadata
{%- if values.enableDocker %}
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
{%- endif %}
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # NPM configuration
```

## Environment Variables

Create a `.env.local` file in the root directory:

| Variable      | Description                              | Default        |
| ------------- | ---------------------------------------- | -------------- |
| `NODE_ENV`    | Application environment                  | development    |
| `PORT`        | Server port                              | ${{ values.port }} |
{%- if values.includeAuth %}
| `NEXTAUTH_URL` | NextAuth URL                            | http://localhost:${{ values.port }} |
| `NEXTAUTH_SECRET` | NextAuth secret                      | -              |
{%- endif %}
{%- if values.includeAPI %}
| `NEXT_PUBLIC_API_URL` | Backend API URL                  | http://localhost:8080 |
{%- endif %}
{%- if values.enableSentry %}
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking | -              |
{%- endif %}
{%- if values.enableAnalytics %}
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics tracking ID       | -              |
{%- endif %}

{%- if values.enableDocker %}

## Docker

### Development

```bash
docker-compose up
```

### Production Build

```bash
docker build -t ${{ values.name }} .
docker run -p ${{ values.port }}:${{ values.port }} --env-file .env.local ${{ values.name }}
```
{%- endif %}

## Styling

This project uses Tailwind CSS for styling. Key files:
- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles and Tailwind imports

{%- if values.uiLibrary != 'none' %}

### UI Components

This project uses ${{ values.uiLibrary }} for pre-built UI components. Check the documentation for available components and usage.
{%- endif %}

{%- if values.includeAuth %}

## Authentication

NextAuth.js is configured for authentication. Supported providers can be configured in `app/api/auth/[...nextauth]/route.ts`.
{%- endif %}

{%- if values.includeAPI %}

## API Integration

React Query is configured for API calls. Example usage:

```typescript
import { useQuery } from '@tanstack/react-query'

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['myData'],
    queryFn: () => fetch('/api/data').then(res => res.json())
  })

  // ... render component
}
```
{%- endif %}

{%- if values.includeStateManagement != 'none' %}

## State Management

This project uses ${{ values.includeStateManagement }} for state management. Store files are located in `store/` or `lib/store/`.
{%- endif %}

## Code Quality

### Linting

ESLint is configured for code quality:

```bash
npm run lint
npm run lint:fix
```

### Formatting

Prettier is configured for consistent code formatting. Files are automatically formatted on save (if your editor is configured).

## Backstage Integration

This application is fully integrated with Backstage:

1. **Software Catalog**: Defined in `catalog-info.yaml`
2. **Metadata**: Tags, links, and ownership information
3. **CI/CD**: GitHub Actions integration

The application is automatically registered in Backstage catalog.

{%- if values.deploymentTarget == 'vercel' %}

## Deployment to Vercel

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
{%- elif values.deploymentTarget == 'netlify' %}

## Deployment to Netlify

This application can be deployed to Netlify:

1. Push your code to GitHub
2. Import the project in Netlify dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Configure environment variables
5. Deploy!
{%- elif values.deploymentTarget == 'kubernetes' %}

## Kubernetes Deployment

Kubernetes manifests are provided for deployment:

```bash
kubectl apply -f k8s/
```

Ensure you configure:
- ConfigMaps for environment variables
- Secrets for sensitive data
- Service and Ingress for networking
- HorizontalPodAutoscaler for scaling
{%- endif %}

{%- if values.includePWA %}

## Progressive Web App (PWA)

This application is configured as a PWA with:
- Service worker for offline support
- Web app manifest for installation
- Caching strategies for assets

Users can install the app on their devices for a native-like experience.
{%- endif %}

{%- if values.includeI18n %}

## Internationalization

This application supports multiple languages. Translation files are located in `locales/` or `messages/` directory.

Add new translations by creating language-specific JSON files.
{%- endif %}

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

---

## Troubleshooting

### Cypress Permission Issues

If you encounter permission errors when running Cypress tests:

```bash
# Clear Cypress cache
npx cypress cache clear

# Reinstall Cypress locally
npm install cypress --save-dev

# Or run with npx to use local version
npx cypress run
```

This ensures Cypress uses the locally installed version with proper permissions.

---

**Generated with Backstage Software Templates** | [Next.js Documentation](https://nextjs.org/docs)
