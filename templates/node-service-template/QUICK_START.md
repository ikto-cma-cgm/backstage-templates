# Quick Start Guide - Node.js Service Template

This guide will get you up and running with the Node.js Service Template in 5 minutes.

## For Developers: Using the Template

### Step 1: Access Backstage
Navigate to: http://localhost:7001/create

### Step 2: Find the Template
Look for **"Node.js Microservice"** in the templates list

### Step 3: Fill the Form
Minimum required:
- **Service Name**: e.g., `my-awesome-service`
- **Description**: e.g., `Manages user profiles and preferences`
- **Owner**: Select your team

### Step 4: Create
Click "Create" and wait ~30 seconds

### Step 5: Clone and Start
```bash
# Clone your new service
git clone https://github.com/ikto-cma-cgm/my-awesome-service.git
cd my-awesome-service

# Install and run
npm install
cp .env.example .env
npm run dev
```

### Step 6: Verify
- Health: http://localhost:3000/health
- API Docs: http://localhost:3000/api-docs
- Backstage: http://localhost:7001/catalog

**Done!** Start building your service.

---

## For Platform Engineers: Registering the Template

### Option 1: Quick Registration (Recommended)

1. **Add to Backstage config**

Edit `/Users/mak/workspace/ikki/cma/platform/app-config.local.yaml`:

```yaml
catalog:
  locations:
    # Add this:
    - type: url
      target: https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml
      rules:
        - allow: [Template]
```

2. **Set GitHub token**

```bash
export GITHUB_TOKEN=ghp_your_token_here
```

3. **Restart Backstage**

```bash
cd /Users/mak/workspace/ikki/cma/platform
yarn dev
```

4. **Verify**

Go to http://localhost:7001/create - you should see "Node.js Microservice"

### Option 2: Manual Registration (UI)

1. Go to: http://localhost:7001/catalog-import
2. Click "Register Existing Component"
3. Enter URL: `https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml`
4. Click "Analyze" then "Import"

---

## Validation

### Validate Template
```bash
cd /Users/mak/workspace/ikki/cma/services/applications/node-service-template
./validate-template.sh
```

### Test Template Creation
1. Go to http://localhost:7001/create
2. Choose "Node.js Microservice"
3. Fill form with test values
4. Click "Create"
5. Verify repository was created
6. Clone and test locally

---

## GitHub Token Setup

The template needs GitHub access to create repositories.

### Create Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - ✅ repo (Full control)
   - ✅ workflow (Update workflows)
   - ✅ write:packages (optional)
4. Generate and copy token

### Set Token
```bash
# Temporary (current session)
export GITHUB_TOKEN=ghp_xxxxx

# Permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export GITHUB_TOKEN=ghp_xxxxx' >> ~/.bashrc
source ~/.bashrc
```

### Configure in Backstage
Already configured in `app-config.local.yaml`:

```yaml
integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}

scaffolder:
  github:
    token: ${GITHUB_TOKEN}
    visibility: internal
```

---

## Troubleshooting

### Template Not Appearing

**Problem**: Template not showing in http://localhost:7001/create

**Solutions**:
```bash
# 1. Check Backstage logs
cd /Users/mak/workspace/ikki/cma/platform
yarn dev | grep -i template

# 2. Check template URL is accessible
curl https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml

# 3. Validate template syntax
cd /Users/mak/workspace/ikki/cma/services/applications/node-service-template
./validate-template.sh

# 4. Force refresh in Backstage UI
# Go to: http://localhost:7001/catalog
# Find: template:default/node-service-template
# Click: Refresh button
```

### GitHub Authentication Error

**Problem**: "Failed to create repository"

**Solutions**:
```bash
# 1. Check token is set
echo $GITHUB_TOKEN

# 2. Verify token permissions
# Token must have: repo, workflow scopes

# 3. Check organization access
# Token must have access to ikto-cma-cgm organization

# 4. Restart Backstage after setting token
```

### Repository Already Exists

**Problem**: "Repository already exists"

**Solutions**:
- Use a different service name
- Delete the existing repository first
- Or clone and use the existing repository

### Port Conflict

**Problem**: Service won't start - port in use

**Solutions**:
```bash
# Option 1: Change port in .env
PORT=3001

# Option 2: Stop conflicting service
lsof -ti:3000 | xargs kill -9

# Option 3: Use Docker
npm run docker:run
```

---

## Next Steps

### For Developers
1. Read: [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md) for detailed usage
2. Create your first service
3. Start building features
4. Check Backstage catalog for your service

### For Platform Engineers
1. Read: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for advanced setup
2. Customize template if needed
3. Train development teams
4. Monitor template usage

---

## Key Files

| File | Purpose |
|------|---------|
| `template.yaml` | Template definition for Backstage |
| `skeleton/` | Template files with Nunjucks variables |
| `TEMPLATE_USAGE.md` | Developer guide |
| `INTEGRATION_GUIDE.md` | Platform engineer guide |
| `app-config.template.yaml` | Backstage configuration example |
| `validate-template.sh` | Template validation script |
| `CHANGELOG.md` | Version history |

---

## Resources

- **Backstage Templates**: https://backstage.io/docs/features/software-templates
- **Template Repository**: https://github.com/ikto-cma-cgm/node-service-template
- **Backstage UI**: http://localhost:7001
- **Create Page**: http://localhost:7001/create
- **Catalog**: http://localhost:7001/catalog

---

## Support

- **Issues**: https://github.com/ikto-cma-cgm/node-service-template/issues
- **Platform Team**: Contact via Slack or email
- **Documentation**: Check TEMPLATE_USAGE.md and INTEGRATION_GUIDE.md

---

## Summary

### Developers
```bash
# 1. Go to Backstage
open http://localhost:7001/create

# 2. Choose "Node.js Microservice"
# 3. Fill form and click "Create"
# 4. Clone and start developing
```

### Platform Engineers
```bash
# 1. Set GitHub token
export GITHUB_TOKEN=ghp_xxxxx

# 2. Add to app-config.local.yaml
# (see example above)

# 3. Restart Backstage
cd /Users/mak/workspace/ikki/cma/platform
yarn dev

# 4. Verify at http://localhost:7001/create
```

**That's it!** You're ready to create Node.js microservices with Backstage.

---

**Last Updated**: 2025-12-12
**Template Version**: 1.0.0
