# Files Overview - Node.js Service Template

Quick reference guide to understand what each file does in this template repository.

## Core Template Files

| File | Purpose | Audience |
|------|---------|----------|
| `template.yaml` | Main Backstage template definition with parameters and scaffolder actions | Platform Engineers, Template Maintainers |
| `skeleton/` | Directory containing all template files that will be copied when creating a service | All |
| `.backstage-template-ignore` | Files to exclude from scaffolding (like .git, node_modules, etc.) | Template Maintainers |

## Documentation Files (Choose Based on Your Role)

### For Developers
| File | Purpose | Reading Time |
|------|---------|--------------|
| `START_HERE.md` | Navigation guide - start here if you're new | 2 min |
| `QUICK_START.md` | Get started in 5 minutes | 5 min |
| `TEMPLATE_USAGE.md` | Complete guide for using the template | 15 min |

### For Platform Engineers
| File | Purpose | Reading Time |
|------|---------|--------------|
| `INTEGRATION_GUIDE.md` | Setup and configuration guide | 20 min |
| `app-config.template.yaml` | Example Backstage configuration | 5 min |
| `validate-template.sh` | Script to validate template structure | N/A (run it) |

### For Everyone
| File | Purpose | Reading Time |
|------|---------|--------------|
| `README.md` | Repository overview and quick links | 5 min |
| `TEMPLATE_SUMMARY.md` | Complete technical reference | 30 min |
| `CHANGELOG.md` | Version history and changes | 5 min |
| `FILES_OVERVIEW.md` | This file - guide to all files | 5 min |

## Configuration Files

| File | Purpose |
|------|---------|
| `app-config.template.yaml` | Example configuration for registering template in Backstage |
| `.backstage-template-ignore` | List of files/patterns to exclude from scaffolding |

## Tools and Scripts

| File | Purpose | Usage |
|------|---------|-------|
| `validate-template.sh` | Validates template structure and syntax | `./validate-template.sh` |

## Skeleton Directory Structure

The `skeleton/` directory contains all files that will be copied when creating a new service:

### Source Code
```
skeleton/src/
├── config/           # Configuration files (logger, app config)
├── middleware/       # Express middleware (error handler, rate limiter, etc.)
├── routes/          # API routes (health, swagger, examples)
├── controllers/     # Business logic (empty - for users to fill)
├── models/          # Data models (empty - for users to fill)
└── index.js         # Application entry point
```

### Configuration Files (in skeleton/)
| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies and scripts (templated) |
| `catalog-info.yaml` | Backstage catalog entry (templated) |
| `README.md` | Service documentation (templated) |
| `.env.example` | Environment variables template (templated) |
| `Dockerfile` | Docker image definition (templated) |
| `docker-compose.yml` | Local development setup (templated) |
| `mkdocs.yml` | TechDocs configuration (templated) |
| `openapi.yaml` | OpenAPI/Swagger specification |
| `.eslintrc.json` | ESLint configuration |
| `.prettierrc` | Prettier configuration |
| `.gitignore` | Git ignore rules |

### CI/CD
```
skeleton/.github/workflows/
└── ci.yml           # GitHub Actions pipeline
```

### Documentation
```
skeleton/docs/
├── index.md                    # TechDocs home
├── getting-started/
│   ├── overview.md
│   ├── installation.md
│   ├── configuration.md
│   └── running-locally.md
└── architecture/
    └── project-structure.md
```

## Original Template Files (Not Part of Scaffolding)

These files exist in the template repository but are NOT copied to generated services:

### Documentation (Template-Specific)
- `BACKSTAGE_INTEGRATION.md` - Original integration docs
- `PROJECT_OVERVIEW.md` - Original project overview
- `SETUP_SUMMARY.md` - Original setup summary
- `QUICK_REFERENCE.md` - Original quick reference
- `CONTRIBUTING.md` - Template contribution guidelines
- `INDEX.md` - Original index file

### Configuration
- `catalog-info.yaml` - Template's own catalog entry (root level)
- `openapi.yaml` - Template's API spec (root level)

### Scripts
- `scripts/setup.sh` - Template setup script

## File Priorities by Role

### "I just want to create a service"
1. `START_HERE.md`
2. `QUICK_START.md`
3. Go to http://localhost:7001/create

### "I need to set up this template"
1. `START_HERE.md`
2. `INTEGRATION_GUIDE.md`
3. `app-config.template.yaml`
4. Run `validate-template.sh`

### "I want to customize the template"
1. `TEMPLATE_SUMMARY.md`
2. `template.yaml`
3. Files in `skeleton/`
4. Run `validate-template.sh`

### "I'm just browsing"
1. `START_HERE.md`
2. `README.md`
3. `TEMPLATE_SUMMARY.md`

## Nunjucks Variables

Files in `skeleton/` use Nunjucks templating syntax:

- `${{ values.name }}` - Service name
- `${{ values.description }}` - Description
- `${{ values.owner }}` - Owner
- `${{ values.port }}` - Port number
- `{%- if values.includeDatabase %}` - Conditional blocks

See `TEMPLATE_SUMMARY.md` for complete variable reference.

## File Size Reference

Approximate file sizes:

| Category | Files | Total Lines |
|----------|-------|-------------|
| Template Definition | 1 | ~500 |
| Skeleton Source Code | ~15 | ~1000 |
| Skeleton Config Files | ~15 | ~500 |
| Documentation | 10 | ~3000 |
| **Total** | **~40** | **~5000** |

## Common File Operations

### View Template Definition
```bash
cat template.yaml
```

### Validate Template
```bash
./validate-template.sh
```

### View Skeleton Structure
```bash
ls -R skeleton/
```

### Check Nunjucks Variables
```bash
grep -r '\${{' skeleton/
```

### Find All Documentation
```bash
find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*"
```

## File Dependencies

```
template.yaml
    ↓ references
skeleton/*
    ↓ uses
Nunjucks variables
    ↓ defined in
template.yaml parameters

app-config.template.yaml
    ↓ configures
Backstage catalog
    ↓ loads
template.yaml
```

## Maintenance Notes

### Files to Update When Changing Template
1. `template.yaml` - If adding/removing parameters
2. `skeleton/*` - If changing generated service structure
3. `TEMPLATE_USAGE.md` - If changing user experience
4. `CHANGELOG.md` - Always document changes
5. `TEMPLATE_SUMMARY.md` - If changing features

### Files That Auto-Update
- None (all files are manually maintained)

### Files to Ignore
- `.git/` - Git internals
- `node_modules/` - Dependencies (if running locally)
- `.DS_Store` - macOS files

## Quick File Access

### Most Important Files
```bash
# Template definition
cat template.yaml

# Developer guide
cat TEMPLATE_USAGE.md

# Setup guide
cat INTEGRATION_GUIDE.md

# Technical reference
cat TEMPLATE_SUMMARY.md
```

### Validation and Testing
```bash
# Validate
./validate-template.sh

# View skeleton structure
tree skeleton/ -L 2

# Check for Nunjucks variables
grep -r '\${{' skeleton/ | head -10
```

---

**Need help finding something?** Start with `START_HERE.md`

**Version**: 1.0.0
**Last Updated**: 2025-12-12
