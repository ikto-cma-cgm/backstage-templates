# React Best Practices Guide

This project demonstrates industry best practices for React/Next.js applications. This guide explains the patterns and principles implemented in the codebase.

## Table of Contents

- [Project Structure](#project-structure)
- [TypeScript Best Practices](#typescript-best-practices)
- [Component Best Practices](#component-best-practices)
- [Custom Hooks](#custom-hooks)
- [State Management](#state-management)
- [Performance Optimization](#performance-optimization)
- [Accessibility](#accessibility)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Code Organization](#code-organization)

## Project Structure

```
/app                    # Next.js app directory (pages and routes)
  /examples            # Example pages demonstrating best practices
  layout.tsx           # Root layout with shared components
  page.tsx             # Home page

/components            # Reusable React components
  /ui                  # UI components (buttons, cards, etc.)
  /forms               # Form components (inputs, selects, etc.)
  /layout              # Layout components (header, footer, etc.)

/hooks                 # Custom React hooks
  use-fetch.ts         # Data fetching hook
  use-debounce.ts      # Debounce hook for performance
  use-local-storage.ts # Persistent state hook
  use-media-query.ts   # Responsive design hook

/lib                   # Utility functions and helpers
  utils.ts             # General utilities
  api-client.ts        # API client with error handling

/types                 # TypeScript type definitions
  index.ts             # Shared types and interfaces

/public                # Static assets
```

## TypeScript Best Practices

### 1. Strict Type Checking

Enable strict mode in `tsconfig.json`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true
  }
}
\`\`\`

### 2. Define Explicit Types

**Good:**
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // ...
}
\`\`\`

**Avoid:**
\`\`\`typescript
function getUser(id: any): any {
  // Loses type safety
}
\`\`\`

### 3. Use Generics for Reusable Code

\`\`\`typescript
function useFetch<T>(url: string): { data: T | null; loading: boolean } {
  // Generic type T makes this hook reusable
}
\`\`\`

## Component Best Practices

### 1. Component Composition

Break down complex components into smaller, reusable pieces:

\`\`\`typescript
// Card component with composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
\`\`\`

### 2. Props Interface

Always define props with TypeScript interfaces:

\`\`\`typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({ variant = 'primary', isLoading, ...props }: ButtonProps) {
  // ...
}
\`\`\`

### 3. Forward Refs

Use `forwardRef` for components that need ref access:

\`\`\`typescript
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);
\`\`\`

### 4. Avoid Prop Drilling

Use composition or context instead of passing props through many levels:

\`\`\`typescript
// Good: Using composition
<Layout>
  <Sidebar user={user} />
  <Content user={user} />
</Layout>

// Better: Using context for deeply nested data
const UserContext = createContext<User | null>(null);
\`\`\`

## Custom Hooks

### 1. Naming Convention

Always prefix custom hooks with "use":

\`\`\`typescript
function useDebounce<T>(value: T, delay: number): T {
  // ...
}
\`\`\`

### 2. Cleanup in useEffect

Always clean up side effects to prevent memory leaks:

\`\`\`typescript
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(/* ... */);

  // Cleanup function
  return () => {
    controller.abort();
  };
}, [url]);
\`\`\`

### 3. Extract Reusable Logic

Move reusable logic into custom hooks:

\`\`\`typescript
// Instead of repeating localStorage logic everywhere:
const [value, setValue] = useLocalStorage('key', initialValue);
\`\`\`

## State Management

### 1. Local State First

Use local state (`useState`) when state is only needed in one component:

\`\`\`typescript
const [count, setCount] = useState(0);
\`\`\`

### 2. Lift State Up

Move state to common parent when multiple components need it:

\`\`\`typescript
function Parent() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Profile user={user} />
      <Settings user={user} onUpdate={setUser} />
    </>
  );
}
\`\`\`

### 3. Use Reducers for Complex State

Use `useReducer` for complex state logic:

\`\`\`typescript
const [state, dispatch] = useReducer(formReducer, initialState);
\`\`\`

## Performance Optimization

### 1. Debouncing

Debounce expensive operations like API calls:

\`\`\`typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  // API call only runs after user stops typing for 500ms
  searchAPI(debouncedSearch);
}, [debouncedSearch]);
\`\`\`

### 2. Memoization

Use `useMemo` for expensive calculations:

\`\`\`typescript
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.value - b.value);
}, [items]);
\`\`\`

### 3. useCallback for Function Props

Prevent unnecessary re-renders:

\`\`\`typescript
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
\`\`\`

### 4. Code Splitting

Use dynamic imports for large components:

\`\`\`typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
});
\`\`\`

## Accessibility

### 1. Semantic HTML

Use proper HTML elements:

\`\`\`typescript
// Good
<button onClick={handleClick}>Click me</button>

// Avoid
<div onClick={handleClick}>Click me</div>
\`\`\`

### 2. ARIA Attributes

Add ARIA attributes for screen readers:

\`\`\`typescript
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>
  ×
</button>
\`\`\`

### 3. Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

\`\`\`typescript
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Interactive div
</div>
\`\`\`

### 4. Form Labels

Always associate labels with inputs:

\`\`\`typescript
<label htmlFor="email">Email</label>
<input id="email" type="email" />
\`\`\`

### 5. Error Messages

Use `role="alert"` for error messages:

\`\`\`typescript
{error && (
  <p role="alert" aria-live="polite">
    {error}
  </p>
)}
\`\`\`

## Error Handling

### 1. Try-Catch for Async Operations

\`\`\`typescript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
\`\`\`

### 2. Error Boundaries

Create error boundaries for component errors:

\`\`\`typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
\`\`\`

### 3. Custom Error Classes

\`\`\`typescript
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
\`\`\`

## Testing

### 1. Component Testing

Test user interactions, not implementation:

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';

test('button click increments counter', () => {
  render(<Counter />);

  const button = screen.getByRole('button', { name: /increment/i });
  fireEvent.click(button);

  expect(screen.getByText('1')).toBeInTheDocument();
});
\`\`\`

### 2. Hook Testing

Test hooks with `renderHook`:

\`\`\`typescript
import { renderHook, act } from '@testing-library/react';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
\`\`\`

### 3. Test Accessibility

Test ARIA attributes and roles:

\`\`\`typescript
test('button has correct aria attributes', () => {
  render(<Button aria-label="Close" />);
  const button = screen.getByRole('button', { name: /close/i });
  expect(button).toBeInTheDocument();
});
\`\`\`

## Code Organization

### 1. One Component Per File

Keep components in separate files for better maintainability.

### 2. Consistent Naming

- Components: PascalCase (`Button.tsx`, `UserProfile.tsx`)
- Hooks: camelCase with "use" prefix (`useAuth.ts`, `useFetch.ts`)
- Utilities: camelCase (`formatDate.ts`, `apiClient.ts`)
- Types: PascalCase (`User.ts`, `ApiResponse.ts`)

### 3. File Organization

\`\`\`
component.tsx           # Component implementation
component.test.tsx      # Component tests
component.stories.tsx   # Storybook stories (if used)
\`\`\`

### 4. Barrel Exports

Use index files to simplify imports:

\`\`\`typescript
// components/ui/index.ts
export { Button } from './button';
export { Card } from './card';
export { Input } from './input';

// Usage
import { Button, Card, Input } from '@/components/ui';
\`\`\`

## Additional Resources

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Testing Library](https://testing-library.com/react)

## Examples

See the `/examples` page in this application for live demonstrations of these best practices.

---

**Remember:** These are guidelines, not strict rules. Always consider your specific use case and team preferences when applying these patterns.