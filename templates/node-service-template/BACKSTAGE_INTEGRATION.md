# Backstage Integration Guide

This document explains how to integrate the Node Service Template with your existing Backstage instance.

## Current Backstage Setup

Based on your existing catalog structure at:
```
/Users/mak/workspace/ikki/cma/platform/catalog/
```

You have:
- `catalog-info.yaml` - Main catalog location file
- `services/` - Service catalog entries
- `systems/` - System definitions
- `users/` - User definitions
- `groups/` - Group definitions

## Integration Steps

### Option 1: Add to Existing Catalog Location (Recommended)

1. **Update Main Catalog File**

   Edit `/Users/mak/workspace/ikki/cma/platform/catalog/catalog-info.yaml`:

   ```yaml
   apiVersion: backstage.io/v1alpha1
   kind: Location
   metadata:
     name: application-services
     description: Application service catalog - services, systems, users and groups
   spec:
     type: file
     targets:
       # Existing services
       - /app/catalog/services/node-service-catalog-info.yaml
       - /app/catalog/services/react-service-catalog-info.yaml
       - /app/catalog/services/web-service-catalog-info.yaml

       # Add your new template
       - /app/services/applications/node-service-template/catalog-info.yaml

       # Existing systems, users, groups
       - /app/catalog/systems/web-application-catalog-info.yaml
       - /app/catalog/users/admin-users-catalog-info.yaml
       - /app/catalog/users/guest-user-catalog-info.yaml
       - /app/catalog/groups/admin-group-catalog-info.yaml
   ```

   **Note**: The path `/app/services/applications/node-service-template/catalog-info.yaml`
   corresponds to your Docker volume mapping. Adjust based on your docker-compose.yml configuration.

2. **Verify Docker Volume Mapping**

   Check your Backstage docker-compose.yml has the volume mapped:

   ```yaml
   services:
     backstage:
       volumes:
         - ../services:/app/services:ro  # Read-only access to services
         - ./catalog:/app/catalog:ro     # Read-only access to catalog
   ```

3. **Restart Backstage**

   ```bash
   cd /Users/mak/workspace/ikki/cma/platform
   docker-compose restart backstage
   ```

### Option 2: Separate Catalog Location File

Create a new location file for application services:

1. **Create Location File**

   `/Users/mak/workspace/ikki/cma/platform/catalog/locations/applications-catalog-info.yaml`:

   ```yaml
   apiVersion: backstage.io/v1alpha1
   kind: Location
   metadata:
     name: application-templates
     description: Node.js application service templates
   spec:
     type: file
     targets:
       - /app/services/applications/node-service-template/catalog-info.yaml
       # Add more application services here as they're created
   ```

2. **Register Location in Backstage**

   Via UI:
   - Go to Backstage → "Create" → "Register Existing Component"
   - Enter: `file:///app/catalog/locations/applications-catalog-info.yaml`
   - Click "Analyze" → "Import"

   Or add to main catalog-info.yaml targets.

### Option 3: Git-Based Registration (Production Recommended)

1. **Push to Git Repository**

   ```bash
   cd /Users/mak/workspace/ikki/cma/services/applications/node-service-template
   git init
   git add .
   git commit -m "feat: add Node.js service template"
   git remote add origin https://github.com/your-org/node-service-template.git
   git push -u origin main
   ```

2. **Register in Backstage**

   Via UI:
   - Go to Backstage → "Create" → "Register Existing Component"
   - Enter: `https://github.com/your-org/node-service-template/blob/main/catalog-info.yaml`
   - Click "Analyze" → "Import"

   Or programmatically in app-config.yaml:

   ```yaml
   catalog:
     locations:
       - type: url
         target: https://github.com/your-org/node-service-template/blob/main/catalog-info.yaml
         rules:
           - allow: [Component, API, System, Group]
   ```

## Customizing for Your Environment

### Update Catalog Metadata

Edit `catalog-info.yaml` to match your organization:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: node-service-template  # Change to your service name
  title: Node.js Service Template
  description: Your description here
  annotations:
    # Update these based on your setup
    github.com/project-slug: your-org/your-repo
    backstage.io/techdocs-ref: dir:.
  tags:
    - nodejs
    - express
    # Add your custom tags
spec:
  type: service
  lifecycle: production  # or: experimental, deprecated
  owner: platform-team   # Update to your team
  system: platform-services  # Update to your system
```

### Update System and Group References

Ensure the referenced entities exist in your catalog:

1. **System**: `platform-services`

   If it doesn't exist, create it in `/Users/mak/workspace/ikki/cma/platform/catalog/systems/`:

   ```yaml
   apiVersion: backstage.io/v1alpha1
   kind: System
   metadata:
     name: platform-services
     title: Platform Services
     description: Core platform infrastructure services
   spec:
     owner: platform-team
     domain: platform
   ```

2. **Group**: `platform-team`

   If it doesn't exist, create it in `/Users/mak/workspace/ikki/cma/platform/catalog/groups/`:

   ```yaml
   apiVersion: backstage.io/v1alpha1
   kind: Group
   metadata:
     name: platform-team
     title: Platform Engineering Team
   spec:
     type: team
     children: []
   ```

## Verifying Integration

### 1. Check Catalog Processing

View Backstage logs:
```bash
cd /Users/mak/workspace/ikki/cma/platform
docker-compose logs -f backstage | grep -i catalog
```

Look for:
```
[1] Catalog processing: Processing entities...
[1] Catalog processing: Processed catalog-info.yaml
```

### 2. View in Backstage UI

1. Navigate to: http://localhost:7007 (or your Backstage URL)
2. Go to "Catalog"
3. Search for "node-service-template"
4. Click on the service to view:
   - Overview tab
   - API tab (OpenAPI spec)
   - Docs tab (TechDocs)
   - Dependencies tab

### 3. Verify TechDocs

TechDocs should be available at:
```
http://localhost:7007/docs/default/component/node-service-template
```

If TechDocs don't appear:
1. Check mkdocs.yml is valid
2. Verify docs/ folder has content
3. Check Backstage TechDocs configuration in app-config.yaml
4. Rebuild TechDocs: Backstage → Service → Docs → Refresh

### 4. Verify API Documentation

API docs should be viewable:
1. Go to service in catalog
2. Click "API" tab
3. Should show OpenAPI specification from openapi.yaml

## Troubleshooting

### Service Not Appearing in Catalog

**Check 1: File Path**
```bash
# Verify file exists at expected location
docker exec -it backstage-container ls -la /app/services/applications/node-service-template/catalog-info.yaml
```

**Check 2: YAML Syntax**
```bash
# Validate YAML syntax
cat catalog-info.yaml | docker run -i --rm mikefarah/yq eval -
```

**Check 3: Catalog Location**
```bash
# Verify location is registered
docker exec -it backstage-container cat /app/catalog/catalog-info.yaml
```

### TechDocs Not Building

**Check 1: MkDocs Configuration**
```bash
# Validate mkdocs.yml
cd /Users/mak/workspace/ikki/cma/services/applications/node-service-template
docker run -v $(pwd):/docs squidfunk/mkdocs-material build
```

**Check 2: Backstage TechDocs Config**

In app-config.yaml:
```yaml
techdocs:
  builder: 'local'
  generator:
    runIn: 'local'
  publisher:
    type: 'local'
```

**Check 3: Force Rebuild**
1. Go to service in Backstage
2. Click "Docs" tab
3. Click "Rebuild documentation"

### API Not Showing

**Check 1: OpenAPI Syntax**
```bash
# Validate OpenAPI spec
npx @stoplight/spectral-cli lint openapi.yaml
```

**Check 2: Definition Reference**

In catalog-info.yaml:
```yaml
spec:
  definition:
    $text: ./openapi.yaml  # Relative to catalog-info.yaml
```

## Advanced Configuration

### Custom Annotations

Add organization-specific annotations:

```yaml
metadata:
  annotations:
    # Monitoring
    grafana/dashboard-selector: service-name
    prometheus.io/rule: service-name

    # Incident Management
    pagerduty.com/integration-key: YOUR_KEY
    opsgenie.com/component-selector: service-name

    # Error Tracking
    sentry.io/project-slug: service-name

    # CI/CD
    github.com/workflows: ci.yml,deploy.yml
    jenkins.io/job-full-name: folder/service-name

    # Cloud
    aws.com/lambda-function-name: service-name
    kubernetes.io/deployment: service-name
```

### Multiple Environments

Define multiple instances:

```yaml
---
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: node-service-dev
  title: Node Service (Development)
spec:
  type: service
  lifecycle: experimental
  owner: platform-team
  system: platform-services

---
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: node-service-prod
  title: Node Service (Production)
spec:
  type: service
  lifecycle: production
  owner: platform-team
  system: platform-services
```

### Dependencies

Define service dependencies:

```yaml
spec:
  dependsOn:
    - resource:postgresql-db
    - component:auth-service
    - component:redis-cache

  consumesApis:
    - payment-api
    - notification-api
```

## Best Practices

1. **Use Git-Based Registration in Production**
   - More reliable than file-based
   - Supports versioning
   - Better for CI/CD

2. **Keep Metadata Updated**
   - Update owners when teams change
   - Update lifecycle stages
   - Keep links current

3. **Leverage Tags**
   - Use consistent tagging across services
   - Enable filtering and grouping
   - Document tag conventions

4. **Document Dependencies**
   - Explicitly declare all dependencies
   - Keep dependency graph updated
   - Use for impact analysis

5. **Maintain TechDocs**
   - Keep documentation current
   - Use consistent structure
   - Include runbooks

## Next Steps

After integration:

1. **Create More Services**
   - Use this template for new services
   - Standardize across organization
   - Build service catalog

2. **Customize Template**
   - Add organization-specific features
   - Create variant templates
   - Document customizations

3. **Enable Plugins**
   - Configure monitoring plugins
   - Enable CI/CD integration
   - Add cloud provider plugins

4. **Train Team**
   - Document usage patterns
   - Create onboarding guides
   - Establish best practices

## Support

For issues with Backstage integration:
1. Check Backstage logs
2. Validate YAML syntax
3. Review Backstage documentation
4. Contact Platform Team

---

**Integration Type**: File-based (Docker volume)
**Backstage Version**: Compatible with v1.x
**Last Updated**: 2024-12-12
