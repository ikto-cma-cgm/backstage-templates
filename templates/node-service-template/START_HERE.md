# START HERE - Node.js Service Template

Welcome to the Node.js Microservice Template for Backstage!

## What is this?

This is a **Backstage Software Template** that allows developers to create production-ready Node.js microservices in minutes through a web interface.

## Choose Your Path

### 👨‍💻 I'm a Developer (Want to create a new service)

**Quick Path**:
1. Go to http://localhost:7001/create
2. Find "Node.js Microservice"
3. Fill the form and click "Create"
4. Done! Your service is ready

**Detailed Guide**: Read [QUICK_START.md](./QUICK_START.md) (5 minutes)

**Complete Documentation**: Read [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md) (15 minutes)

---

### 🔧 I'm a Platform Engineer (Setting up the template)

**Quick Setup**:
```bash
# 1. Set GitHub token
export GITHUB_TOKEN=ghp_xxxxx

# 2. Add to app-config.local.yaml:
catalog:
  locations:
    - type: url
      target: https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml
      rules:
        - allow: [Template]

# 3. Restart Backstage
cd /Users/mak/workspace/ikki/cma/platform
yarn dev
```

**Detailed Guide**: Read [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

**Complete Reference**: Read [TEMPLATE_SUMMARY.md](./TEMPLATE_SUMMARY.md)

---

### 📚 I'm Exploring (Understanding what's here)

This repository contains:

1. **template.yaml** - The Backstage template definition
2. **skeleton/** - Template files that will be used to create services
3. **Documentation** - Multiple guides for different audiences

**Start with**: [TEMPLATE_SUMMARY.md](./TEMPLATE_SUMMARY.md) for a complete overview

---

## Documentation Map

```
START_HERE.md (this file)
    ↓
    ├─→ For Developers
    │   ├── QUICK_START.md          ⚡ 5-minute quick start
    │   └── TEMPLATE_USAGE.md       📖 Complete usage guide
    │
    ├─→ For Platform Engineers
    │   ├── INTEGRATION_GUIDE.md    🔧 Setup and configuration
    │   ├── app-config.template.yaml 📝 Config example
    │   └── validate-template.sh    ✅ Validation script
    │
    └─→ For Everyone
        ├── TEMPLATE_SUMMARY.md     📊 Complete technical reference
        ├── CHANGELOG.md            📅 Version history
        └── README.md               📄 Repository overview
```

## Quick Links

### For Using the Template
- 🚀 [Create Service](http://localhost:7001/create) - Backstage create page
- 📖 [Usage Guide](./TEMPLATE_USAGE.md) - How to use the template
- ⚡ [Quick Start](./QUICK_START.md) - Get started in 5 minutes

### For Setting Up the Template
- 🔧 [Integration Guide](./INTEGRATION_GUIDE.md) - Setup instructions
- 📝 [Config Example](./app-config.template.yaml) - Backstage configuration
- ✅ [Validation Script](./validate-template.sh) - Test the template

### For Understanding the Template
- 📊 [Technical Summary](./TEMPLATE_SUMMARY.md) - Complete reference
- 📅 [Changelog](./CHANGELOG.md) - Version history
- 📄 [Main README](./README.md) - Repository overview

## File Structure Overview

```
node-service-template/
│
├── 📋 Template Definition
│   └── template.yaml              # Main template file (Backstage)
│
├── 📦 Template Content
│   └── skeleton/                  # Files used to create services
│       ├── src/                   # Source code template
│       ├── docs/                  # Documentation template
│       ├── .github/               # CI/CD workflows
│       ├── catalog-info.yaml      # Backstage metadata
│       ├── package.json           # NPM configuration
│       ├── Dockerfile             # Container image
│       ├── docker-compose.yml     # Local development
│       └── ... (more files)
│
├── 📚 Documentation
│   ├── START_HERE.md             # This file (navigation)
│   ├── QUICK_START.md            # 5-minute guide
│   ├── TEMPLATE_USAGE.md         # Developer guide
│   ├── INTEGRATION_GUIDE.md      # Platform engineer guide
│   ├── TEMPLATE_SUMMARY.md       # Technical reference
│   ├── CHANGELOG.md              # Version history
│   └── README.md                 # Repository overview
│
├── 🔧 Configuration
│   ├── app-config.template.yaml  # Backstage config example
│   └── .backstage-template-ignore # Files to exclude
│
└── 🛠️ Tools
    └── validate-template.sh       # Validation script
```

## Common Tasks

### I want to create a new service
1. Read [QUICK_START.md](./QUICK_START.md)
2. Go to http://localhost:7001/create
3. Follow the wizard

### I want to register this template in Backstage
1. Read [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
2. Configure app-config.local.yaml
3. Restart Backstage

### I want to validate the template
```bash
./validate-template.sh
```

### I want to customize the template
1. Read [TEMPLATE_SUMMARY.md](./TEMPLATE_SUMMARY.md)
2. Edit `template.yaml` for parameters
3. Edit `skeleton/` files for content
4. Use `${{ values.variableName }}` for variables
5. Run `./validate-template.sh`

### I want to test the template
1. Add template to local Backstage config
2. Go to http://localhost:7001/create
3. Create a test service
4. Verify the generated service

### I want to understand all features
Read [TEMPLATE_SUMMARY.md](./TEMPLATE_SUMMARY.md) - comprehensive reference

## What This Template Creates

When a developer uses this template, they get a complete Node.js microservice with:

✅ Modern Node.js application with Express
✅ Production-ready security and logging
✅ Docker support and CI/CD pipelines
✅ API documentation with Swagger
✅ Automatic Backstage registration
✅ Health check endpoints
✅ Code quality tools (ESLint, Prettier)
✅ Optional database and Redis support
✅ Optional monitoring (Prometheus, Grafana, Sentry)

**Time saved per service**: 4-8 hours of setup work

## Getting Help

### Template Usage Questions
- Read [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md)
- Check [QUICK_START.md](./QUICK_START.md)

### Template Setup Questions
- Read [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- Check app-config.template.yaml

### Technical Questions
- Read [TEMPLATE_SUMMARY.md](./TEMPLATE_SUMMARY.md)
- Check Backstage docs: https://backstage.io/docs/features/software-templates

### Issues and Bugs
- GitHub Issues: https://github.com/ikto-cma-cgm/node-service-template/issues
- Contact Platform Team

## Next Steps

### Developers
```
1. Read QUICK_START.md (5 min)
2. Create your first service (5 min)
3. Start building features
```

### Platform Engineers
```
1. Read INTEGRATION_GUIDE.md (15 min)
2. Configure Backstage (5 min)
3. Test template creation (5 min)
4. Train development team
```

### Template Maintainers
```
1. Read TEMPLATE_SUMMARY.md (20 min)
2. Understand template structure
3. Review customization options
4. Plan improvements
```

## Support

- **Documentation**: Start with relevant guide above
- **Issues**: https://github.com/ikto-cma-cgm/node-service-template/issues
- **Platform Team**: Contact via Slack or email
- **Backstage Community**: https://backstage.io/community

---

## TL;DR - Absolute Quickest Start

### Developers (Create Service)
```bash
# 1. Open Backstage
open http://localhost:7001/create

# 2. Choose "Node.js Microservice"
# 3. Fill form, click Create
# 4. Clone and start coding
```

### Platform Engineers (Setup Template)
```bash
# 1. Set token
export GITHUB_TOKEN=ghp_xxxxx

# 2. Add to app-config.local.yaml
echo "
catalog:
  locations:
    - type: url
      target: https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml
      rules:
        - allow: [Template]
" >> /Users/mak/workspace/ikki/cma/platform/app-config.local.yaml

# 3. Restart Backstage
cd /Users/mak/workspace/ikki/cma/platform && yarn dev
```

---

**Welcome aboard!** Choose your path above and get started. 🚀

**Version**: 1.0.0
**Last Updated**: 2025-12-12
**Maintained By**: Platform Team
