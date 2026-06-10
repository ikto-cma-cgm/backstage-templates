# Node.js / TypeScript Microservice Template

Scaffolds a **Node.js TypeScript microservice** with Docker and Backstage Catalog integration.

## Purpose

Use this template for backend services written in TypeScript/Node.js. It provides a minimal but production-ready project structure with build tooling, containerisation and Backstage registration out of the box.

### What gets generated

```
<service-name>/
├── src/
│   └── index.ts          # Application entry point
├── package.json          # Dependencies and npm scripts
├── tsconfig.json         # TypeScript compiler config
├── Dockerfile
├── catalog-info.yaml     # Backstage Component entity
├── docs/index.md
└── mkdocs.yml
```

## Usage

1. In Backstage, navigate to **Create → Node.js Microservice**
2. Fill in service identity, owner, system and repository destination
3. After scaffolding:

```bash
git clone <repo>
npm install
npm run build
npm start
```

## Parameters

| Parameter | Description | Default |
|---|---|---|
| `name` | Kebab-case service name | — |
| `description` | Short description | — |
| `owner` | Owning team (Backstage Group) | — |
| `system` | Backstage System | — |
| `domain` | Business domain | — |
| `repoProvider` | `github` or `gitlab` | `github` |
| `repoOwner` | Organisation / namespace | `ikto-cma-cgm` |

## Ownership

- **Owner**: `group:default/it-development-software-engineering-developer-platform`
- **Support**: open an issue on the repository or reach out to the Developer Portal Team.
