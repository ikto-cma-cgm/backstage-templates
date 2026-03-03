# Backstage Integration Guide - Node.js Service Template

This guide explains how to register and configure the Node.js Service Template in your Backstage instance.

## Overview

The Node.js Service Template is now ready to be registered in Backstage as a Software Template. Once registered, developers can use it to create new microservices through the Backstage UI.

## Prerequisites

- Backstage instance running (http://localhost:7001)
- Access to Backstage configuration files
- GitHub authentication configured in Backstage
- Template repository accessible at: https://github.com/ikto-cma-cgm/node-service-template

## Registration Methods

### Method 1: Register via app-config.yaml (Recommended)

This method automatically loads the template when Backstage starts.

#### Step 1: Locate your Backstage configuration

Find your Backstage configuration file:
- Local: `/Users/mak/workspace/ikki/cma/platform/app-config.local.yaml`
- Production: `app-config.production.yaml`

#### Step 2: Add Template Location

Add the following to your `app-config.local.yaml`:

```yaml
catalog:
  locations:
    # ... existing locations ...

    # Node.js Service Template
    - type: url
      target: https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml
      rules:
        - allow: [Template]
```

#### Step 3: Restart Backstage

```bash
cd /Users/mak/workspace/ikki/cma/platform
yarn dev
```

#### Step 4: Verify Registration

1. Go to http://localhost:7001/create
2. You should see "Node.js Microservice" in the templates list

### Method 2: Register via Backstage UI

Use this method for one-time registration or testing.

#### Step 1: Access Catalog Import

1. Navigate to http://localhost:7001/catalog-import
2. Click "Register Existing Component"

#### Step 2: Enter Template URL

Enter the template URL:
```
https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml
```

#### Step 3: Import

1. Click "Analyze"
2. Review the template information
3. Click "Import"

#### Step 4: Verify

1. Go to http://localhost:7001/create
2. The template should appear in the list

### Method 3: Register Multiple Templates (Organizational Setup)

For managing multiple templates at scale:

#### Create a Template Catalog File

Create `templates.yaml` in your Backstage repository:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: org-templates
  description: Organization software templates
spec:
  type: url
  targets:
    - https://github.com/ikto-cma-cgm/node-service-template/blob/main/template.yaml
    # Add more templates here
    # - https://github.com/ikto-cma-cgm/python-service-template/blob/main/template.yaml
    # - https://github.com/ikto-cma-cgm/react-app-template/blob/main/template.yaml
```

#### Register the Catalog File

In `app-config.yaml`:

```yaml
catalog:
  locations:
    - type: url
      target: https://github.com/your-org/backstage-config/blob/main/templates.yaml
      rules:
        - allow: [Location]
```

## Configuration Options

### GitHub Integration

Ensure GitHub authentication is configured in `app-config.yaml`:

```yaml
integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}

scaffolder:
  github:
    token: ${GITHUB_TOKEN}
    visibility: internal # or 'private' or 'public'
```

Set the GitHub token environment variable:

```bash
export GITHUB_TOKEN=ghp_your_token_here
```

### Template Visibility

Control who can see and use the template:

```yaml
# In template.yaml metadata section
metadata:
  annotations:
    backstage.io/view-url: https://github.com/ikto-cma-cgm/node-service-template
    backstage.io/source-location: url:https://github.com/ikto-cma-cgm/node-service-template
```

### Default Values

Customize default values in `template.yaml`:

```yaml
parameters:
  - title: Service Configuration
    properties:
      port:
        default: 3000  # Change this
      nodeVersion:
        default: '18.x'  # Change this
```

## Verification Steps

### 1. Check Template is Loaded

```bash
# Using Backstage CLI
yarn backstage-cli catalog:verify --check templates

# Or check the catalog API
curl http://localhost:7001/api/catalog/entities?filter=kind=Template
```

### 2. Test Template Creation

1. Go to http://localhost:7001/create
2. Find "Node.js Microservice" template
3. Click "Choose"
4. Fill in the form with test values:
   - Name: `test-service`
   - Description: `Test service from template`
   - Owner: Your team/user
5. Review parameters
6. Click "Create" (use dry-run if available)

### 3. Verify Generated Service

After creation:

1. Check the repository was created on GitHub
2. Verify `catalog-info.yaml` exists
3. Check the service appears in Backstage catalog
4. Clone and test the service locally

## Troubleshooting

### Template Not Appearing

**Check Backstage logs:**
```bash
cd /Users/mak/workspace/ikki/cma/platform
yarn dev | grep -i template
```

**Common issues:**
- GitHub token not configured
- Template URL incorrect
- Network connectivity issues
- Template YAML syntax errors

**Solution:**
```bash
# Validate template syntax
npx @backstage/cli validate /Users/mak/workspace/ikki/cma/services/applications/node-service-template/template.yaml
```

### GitHub Authentication Fails

**Check token permissions:**
- repo (Full control)
- workflow (Update workflows)
- write:packages (if needed)
- delete_repo (optional, for cleanup)

**Set token:**
```bash
export GITHUB_TOKEN=your_token_here
# Restart Backstage
```

### Template Creation Fails

**Check scaffolder logs:**
```bash
# In Backstage logs, look for scaffolder errors
yarn dev 2>&1 | grep -i scaffolder
```

**Common issues:**
- Repository already exists
- Insufficient GitHub permissions
- Template syntax errors
- Missing required parameters

### Template Not Refreshing

**Force catalog refresh:**

1. Go to http://localhost:7001/catalog
2. Find the template entity
3. Click "Refresh" or delete and re-import

**Or use API:**
```bash
curl -X POST http://localhost:7001/api/catalog/refresh \
  -H "Content-Type: application/json" \
  -d '{"entityRef": "template:default/node-service-template"}'
```

## Advanced Configuration

### Custom Template Actions

If you need custom scaffolder actions, add them to Backstage:

```typescript
// packages/backend/src/plugins/scaffolder.ts
import { createBuiltinActions } from '@backstage/plugin-scaffolder-backend';

const actions = [
  ...createBuiltinActions({
    // ... config
  }),
  // Add custom actions here
];
```

### Template Validation

Add validation to `template.yaml`:

```yaml
parameters:
  - properties:
      name:
        pattern: '^[a-z][a-z0-9-]*[a-z0-9]$'
        ui:help: 'Must start with letter, use lowercase and hyphens only'
```

### Pre-fill Values

Use URL parameters to pre-fill template forms:

```
http://localhost:7001/create/templates/default/node-service-template?formData={"name":"my-service","owner":"platform-team"}
```

## Environment-Specific Configuration

### Development
```yaml
# app-config.local.yaml
scaffolder:
  defaultAuthor:
    name: Developer
    email: dev@example.com
```

### Production
```yaml
# app-config.production.yaml
scaffolder:
  defaultAuthor:
    name: Backstage
    email: backstage@your-org.com
  defaultCommitMessage: 'Initial commit from Backstage template'
```

## Template Updates

When you update the template:

### 1. Update Version

In `template.yaml`:
```yaml
metadata:
  annotations:
    backstage.io/template-version: '1.1.0'
```

### 2. Commit and Push

```bash
cd /Users/mak/workspace/ikki/cma/services/applications/node-service-template
git add .
git commit -m "Update template to v1.1.0"
git push origin main
```

### 3. Refresh in Backstage

The template will auto-refresh, or manually refresh:

```bash
curl -X POST http://localhost:7001/api/catalog/refresh \
  -H "Content-Type: application/json" \
  -d '{"entityRef": "template:default/node-service-template"}'
```

## Testing the Template

### Local Testing with Dry Run

Use Backstage's dry-run feature (if available):

```yaml
# Add to template.yaml for testing
spec:
  parameters:
    - title: Debug Options
      properties:
        dryRun:
          type: boolean
          title: Dry Run
          description: Test template without creating repository
```

### Integration Tests

Create test scenarios:

1. **Minimal Configuration**: Test with only required fields
2. **Full Configuration**: Test with all features enabled
3. **Edge Cases**: Test unusual names, long descriptions, etc.

### Validation Script

Create a validation script:

```bash
#!/bin/bash
# test-template.sh

echo "Testing Node.js Service Template..."

# Validate template syntax
npx @backstage/cli validate template.yaml

# Check skeleton files exist
test -f skeleton/package.json || exit 1
test -f skeleton/catalog-info.yaml || exit 1
test -f skeleton/README.md || exit 1

echo "Template validation passed!"
```

## Documentation for Developers

Share these resources with your team:

1. **Template Location**: http://localhost:7001/create
2. **Usage Guide**: `/Users/mak/workspace/ikki/cma/services/applications/node-service-template/TEMPLATE_USAGE.md`
3. **Example Service**: Create and share a reference implementation
4. **Team Wiki**: Document organization-specific customizations

## Support and Maintenance

### Template Ownership

- **Owner**: Platform Team
- **Repository**: https://github.com/ikto-cma-cgm/node-service-template
- **Contact**: platform-team@your-org.com

### Update Schedule

- **Security patches**: As needed
- **Dependency updates**: Monthly
- **Feature additions**: Quarterly
- **Major versions**: Annually

### Feedback

Collect feedback from developers:

1. GitHub Issues for bugs
2. Team surveys for feature requests
3. Usage analytics from Backstage
4. Regular retrospectives

## Additional Resources

- **Backstage Docs**: https://backstage.io/docs/features/software-templates
- **Template Actions**: https://backstage.io/docs/features/software-templates/builtin-actions
- **Nunjucks Syntax**: https://mozilla.github.io/nunjucks/templating.html
- **Template Validation**: https://backstage.io/docs/features/software-templates/testing

## Next Steps

1. ✅ Register the template in Backstage
2. ✅ Test template creation with sample data
3. ✅ Document any organization-specific configurations
4. ✅ Train development teams on template usage
5. ✅ Set up monitoring for template usage
6. ✅ Create feedback loop for improvements

---

**Last Updated**: 2025-12-12
**Template Version**: 1.0.0
**Backstage Version**: Latest
