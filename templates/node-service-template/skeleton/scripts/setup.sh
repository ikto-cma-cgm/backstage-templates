#!/bin/bash

# Node Service Template - Setup Script
# This script helps set up the development environment

set -e  # Exit on error

echo "=========================================="
echo "Node Service Template - Setup Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js is not installed${NC}"
    echo "Please install Node.js 18.x or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}ERROR: Node.js version must be 18 or higher${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi
echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}"

# Check npm version
echo "Checking npm version..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}ERROR: npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm version: $(npm -v)${NC}"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Set up environment file
echo ""
echo "Setting up environment file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file from .env.example${NC}"
    echo -e "${YELLOW}⚠ Please review and update .env with your configuration${NC}"
else
    echo -e "${YELLOW}⚠ .env file already exists, skipping${NC}"
fi

# Install git hooks
echo ""
echo "Installing git hooks..."
npm run prepare
echo -e "${GREEN}✓ Git hooks installed${NC}"

# Verify installation
echo ""
echo "Verifying installation..."

# Check if all required files exist
REQUIRED_FILES=(
    "src/index.js"
    "package.json"
    "catalog-info.yaml"
    "openapi.yaml"
    "Dockerfile"
    ".env"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file exists${NC}"
    else
        echo -e "${RED}✗ $file is missing${NC}"
    fi
done

# Summary
echo ""
echo "=========================================="
echo -e "${GREEN}Setup completed successfully!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Review and update .env file with your configuration"
echo "2. Start development server: npm run dev"
echo "3. View API docs: http://localhost:3000/api-docs"
echo "4. Check health: http://localhost:3000/health"
echo ""
echo "For more information, see README.md"
echo ""
