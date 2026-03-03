# Contributing to Node Service Template

Thank you for your interest in contributing to the Node Service Template! This document provides guidelines and best practices for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Maintain a professional environment

## Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-org/node-service-template.git
   cd node-service-template
   ```

2. **Install Dependencies**
   ```bash
   npm install
   npm run prepare  # Install git hooks
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## Development Workflow

### 1. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update relevant documentation

### 2. Test Locally

```bash
# Start development server
npm run dev

# Test your endpoints
curl http://localhost:3000/api/v1/your-endpoint

# Check logs for errors
```

### 3. Code Quality

Before committing, ensure code quality:

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run all checks
npm run validate
```

### 4. Commit Changes

Commits are automatically checked by Husky pre-commit hooks:

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat(api): add user authentication endpoint

fix(middleware): correct rate limiting calculation

docs(readme): update installation instructions

refactor(config): simplify environment variable loading

perf(routes): optimize database queries

chore(deps): update dependencies to latest versions
```

## Code Style Guidelines

### JavaScript/Node.js

- Use ES modules (`import`/`export`)
- Use `async`/`await` over callbacks
- Use arrow functions for short functions
- Use descriptive variable names
- Avoid deeply nested code

### File Naming

- Routes: `*.routes.js` (e.g., `user.routes.js`)
- Controllers: `*.controller.js`
- Models: `*.model.js`
- Middleware: Descriptive names (e.g., `authenticate.js`)
- Services: `*.service.js`

### Code Structure

```javascript
// 1. Imports (external first, then internal)
import express from 'express';
import { logger } from '../config/logger.js';

// 2. Constants
const RETRY_LIMIT = 3;

// 3. Main code
export const myFunction = async () => {
  // Implementation
};

// 4. Default export last
export default router;
```

### Error Handling

Always handle errors properly:

```javascript
// Good
try {
  const result = await someOperation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error: error.message });
  throw new AppError('Operation failed', 500);
}

// Better - use express-async-errors
export const myController = async (req, res) => {
  const result = await someOperation();  // Automatically caught
  res.json({ success: true, data: result });
};
```

## API Development Guidelines

### Adding New Endpoints

1. **Create Route File**
   ```javascript
   // src/routes/resource.routes.js
   import express from 'express';
   const router = express.Router();

   router.get('/', getAllResources);
   router.post('/', createResource);
   // ...

   export default router;
   ```

2. **Register Route**
   ```javascript
   // src/routes/api.routes.js
   import resourceRoutes from './resource.routes.js';
   router.use('/resources', resourceRoutes);
   ```

3. **Update OpenAPI Spec**
   Add endpoint definition to `openapi.yaml`

4. **Update Documentation**
   Document in relevant TechDocs pages

### Request Validation

Always validate input:

```javascript
import Joi from 'joi';
import { validate } from '../middleware/validator.js';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

router.post('/', validate(schema), createResource);
```

### Response Format

Use consistent response formats:

```javascript
// Success
res.status(200).json({
  success: true,
  data: { /* ... */ }
});

// Error
throw new AppError('Error message', 400);
```

## Documentation

### Code Comments

```javascript
/**
 * Calculate user credit score
 * @param {string} userId - User identifier
 * @param {Object} options - Calculation options
 * @param {boolean} options.includeHistory - Include historical data
 * @returns {Promise<number>} Credit score (300-850)
 */
export const calculateCreditScore = async (userId, options = {}) => {
  // Implementation
};
```

### TechDocs

Update relevant documentation in `docs/` when:
- Adding new features
- Changing APIs
- Updating configuration
- Modifying architecture

### OpenAPI Specification

Keep `openapi.yaml` up to date:
- Add new endpoints
- Document request/response schemas
- Include examples
- Add descriptions

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All quality checks pass (`npm run validate`)
- [ ] Documentation is updated
- [ ] OpenAPI spec is updated
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How were these changes tested?

## Documentation
- [ ] Updated OpenAPI spec
- [ ] Updated TechDocs
- [ ] Updated README (if needed)

## Related Issues
Closes #123
```

### Review Process

1. Automated checks must pass (CI/CD)
2. Code review by at least one maintainer
3. All comments addressed
4. Approved and merged

## Project-Specific Guidelines

### Logging

Use structured logging:

```javascript
import { logger } from '../config/logger.js';

// Good
logger.info('User created', { userId, email, role });

// Avoid
console.log('User created: ' + userId);
```

### Configuration

Add new config to:
1. `.env.example` (with comments)
2. `src/config/config.js`
3. `docs/getting-started/configuration.md`

### Dependencies

When adding dependencies:
```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name
```

Update documentation if dependency changes behavior.

## Getting Help

- Check existing documentation in `docs/`
- Review similar code in the project
- Ask questions in team chat
- Create an issue for clarification

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation (for significant contributions)

Thank you for contributing!
