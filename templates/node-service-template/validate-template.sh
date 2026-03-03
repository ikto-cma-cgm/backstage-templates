#!/bin/bash

# Backstage Template Validation Script
# This script validates the Node.js Service Template structure and syntax

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=================================================="
echo "Backstage Template Validation"
echo "=================================================="
echo ""

# Track validation results
ERRORS=0
WARNINGS=0

# Function to print status
print_status() {
    local status=$1
    local message=$2
    if [ "$status" = "OK" ]; then
        echo -e "${GREEN}✓${NC} $message"
    elif [ "$status" = "WARN" ]; then
        echo -e "${YELLOW}⚠${NC} $message"
        ((WARNINGS++))
    else
        echo -e "${RED}✗${NC} $message"
        ((ERRORS++))
    fi
}

# Function to check file exists
check_file() {
    local file=$1
    local description=$2
    if [ -f "$file" ]; then
        print_status "OK" "$description exists: $file"
        return 0
    else
        print_status "ERROR" "$description missing: $file"
        return 1
    fi
}

# Function to check directory exists
check_directory() {
    local dir=$1
    local description=$2
    if [ -d "$dir" ]; then
        print_status "OK" "$description exists: $dir"
        return 0
    else
        print_status "ERROR" "$description missing: $dir"
        return 1
    fi
}

echo "1. Checking Template Structure"
echo "--------------------------------"

# Check main template file
check_file "template.yaml" "Template definition"

# Check skeleton directory
check_directory "skeleton" "Skeleton directory"

# Check essential skeleton files
if [ -d "skeleton" ]; then
    check_file "skeleton/package.json" "Package configuration"
    check_file "skeleton/catalog-info.yaml" "Catalog info"
    check_file "skeleton/README.md" "README"
    check_file "skeleton/Dockerfile" "Dockerfile"
    check_file "skeleton/docker-compose.yml" "Docker Compose"
    check_file "skeleton/.env.example" "Environment example"
    check_file "skeleton/mkdocs.yml" "MkDocs configuration"
    check_file "skeleton/openapi.yaml" "OpenAPI specification"
fi

# Check documentation files
check_file "TEMPLATE_USAGE.md" "Usage documentation"
check_file "INTEGRATION_GUIDE.md" "Integration guide"
check_file "app-config.template.yaml" "Backstage config example"
check_file "CHANGELOG.md" "Changelog"
check_file ".backstage-template-ignore" "Template ignore file"

echo ""
echo "2. Checking Skeleton Structure"
echo "--------------------------------"

if [ -d "skeleton" ]; then
    check_directory "skeleton/src" "Source directory"
    check_directory "skeleton/docs" "Documentation directory"
    check_directory "skeleton/.github" "GitHub workflows"

    if [ -d "skeleton/src" ]; then
        check_directory "skeleton/src/config" "Config directory"
        check_directory "skeleton/src/middleware" "Middleware directory"
        check_directory "skeleton/src/routes" "Routes directory"
        check_file "skeleton/src/index.js" "Main entry point"
    fi
fi

echo ""
echo "3. Validating Template Syntax"
echo "--------------------------------"

# Check if template.yaml is valid YAML
if command -v yamllint &> /dev/null; then
    if yamllint -d relaxed template.yaml > /dev/null 2>&1; then
        print_status "OK" "template.yaml is valid YAML"
    else
        print_status "ERROR" "template.yaml has YAML syntax errors"
        yamllint template.yaml
    fi
else
    print_status "WARN" "yamllint not installed, skipping YAML validation"
fi

# Check if template.yaml contains required fields
if grep -q "apiVersion: scaffolder.backstage.io/v1beta3" template.yaml; then
    print_status "OK" "Template has correct apiVersion"
else
    print_status "ERROR" "Template missing or incorrect apiVersion"
fi

if grep -q "kind: Template" template.yaml; then
    print_status "OK" "Template has correct kind"
else
    print_status "ERROR" "Template missing or incorrect kind"
fi

if grep -q "spec:" template.yaml && grep -q "parameters:" template.yaml && grep -q "steps:" template.yaml; then
    print_status "OK" "Template has required sections (spec, parameters, steps)"
else
    print_status "ERROR" "Template missing required sections"
fi

echo ""
echo "4. Checking Nunjucks Variables"
echo "--------------------------------"

# Check for proper Nunjucks syntax in skeleton files
if [ -d "skeleton" ]; then
    # Check package.json
    if grep -q '\${{ values\.name }}' skeleton/package.json; then
        print_status "OK" "package.json contains Nunjucks variables"
    else
        print_status "WARN" "package.json may be missing Nunjucks variables"
    fi

    # Check catalog-info.yaml
    if grep -q '\${{ values\.name }}' skeleton/catalog-info.yaml; then
        print_status "OK" "catalog-info.yaml contains Nunjucks variables"
    else
        print_status "WARN" "catalog-info.yaml may be missing Nunjucks variables"
    fi

    # Check README.md
    if grep -q '\${{ values\.' skeleton/README.md; then
        print_status "OK" "README.md contains Nunjucks variables"
    else
        print_status "WARN" "README.md may be missing Nunjucks variables"
    fi
fi

echo ""
echo "5. Checking Template Actions"
echo "--------------------------------"

# Check for required scaffolder actions
if grep -q "fetch:template" template.yaml; then
    print_status "OK" "Template uses fetch:template action"
else
    print_status "ERROR" "Template missing fetch:template action"
fi

if grep -q "publish:github" template.yaml; then
    print_status "OK" "Template uses publish:github action"
else
    print_status "WARN" "Template missing publish:github action"
fi

if grep -q "catalog:register" template.yaml; then
    print_status "OK" "Template uses catalog:register action"
else
    print_status "WARN" "Template missing catalog:register action"
fi

echo ""
echo "6. Checking Documentation"
echo "--------------------------------"

# Check if documentation files are not empty
if [ -f "TEMPLATE_USAGE.md" ] && [ -s "TEMPLATE_USAGE.md" ]; then
    print_status "OK" "TEMPLATE_USAGE.md is not empty"
else
    print_status "ERROR" "TEMPLATE_USAGE.md is empty or missing"
fi

if [ -f "INTEGRATION_GUIDE.md" ] && [ -s "INTEGRATION_GUIDE.md" ]; then
    print_status "OK" "INTEGRATION_GUIDE.md is not empty"
else
    print_status "ERROR" "INTEGRATION_GUIDE.md is empty or missing"
fi

# Check if README has been updated for template
if grep -q "Backstage Software Template" README.md; then
    print_status "OK" "README.md mentions Backstage template"
else
    print_status "WARN" "README.md may not be updated for template usage"
fi

echo ""
echo "7. Checking Git Repository"
echo "--------------------------------"

# Check if in a git repository
if git rev-parse --git-dir > /dev/null 2>&1; then
    print_status "OK" "Inside a git repository"

    # Check for uncommitted changes
    if git diff-index --quiet HEAD --; then
        print_status "OK" "No uncommitted changes"
    else
        print_status "WARN" "There are uncommitted changes"
    fi
else
    print_status "WARN" "Not in a git repository"
fi

echo ""
echo "8. Security Checks"
echo "--------------------------------"

# Check for hardcoded secrets or tokens
if grep -r "ghp_\|github_pat_\|sk_\|pk_" skeleton/ --exclude-dir=node_modules 2>/dev/null; then
    print_status "ERROR" "Potential hardcoded secrets found in skeleton/"
else
    print_status "OK" "No obvious hardcoded secrets in skeleton/"
fi

# Check if .env files are properly ignored
if [ -f ".backstage-template-ignore" ]; then
    if grep -q "\.env$" .backstage-template-ignore; then
        print_status "OK" ".env files are ignored in template"
    else
        print_status "WARN" ".env files should be in .backstage-template-ignore"
    fi
fi

echo ""
echo "=================================================="
echo "Validation Summary"
echo "=================================================="
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Your template is ready to be used in Backstage."
    echo ""
    echo "Next steps:"
    echo "1. Commit and push your changes"
    echo "2. Register the template in Backstage"
    echo "3. Test creating a service from the template"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ Validation completed with $WARNINGS warning(s)${NC}"
    echo ""
    echo "Your template should work, but review the warnings above."
    exit 0
else
    echo -e "${RED}✗ Validation failed with $ERRORS error(s) and $WARNINGS warning(s)${NC}"
    echo ""
    echo "Please fix the errors above before using the template."
    exit 1
fi
