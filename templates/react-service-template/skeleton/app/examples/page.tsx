/**
 * Examples Page
 *
 * Demonstrates best practices:
 * - Component composition
 * - Custom hooks usage
 * - Error handling
 * - Loading states
 * - Responsive design
 */

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/forms/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useIsMobile } from '@/hooks/use-media-query';

export default function ExamplesPage() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = useLocalStorage('userName', '');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const isMobile = useIsMobile();

  // Simulated async operation
  const handleAsyncAction = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Action completed successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Best Practices Examples
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrations of React best practices, patterns, and components
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Example 1: Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>
              Accessible buttons with different styles and states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading</Button>
            </div>
          </CardContent>
        </Card>

        {/* Example 2: State Management */}
        <Card>
          <CardHeader>
            <CardTitle>State Management</CardTitle>
            <CardDescription>
              Counter with local state management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-4xl font-bold">{count}</p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setCount((c) => c - 1)}
                  aria-label="Decrement"
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCount(0)}
                  aria-label="Reset"
                >
                  Reset
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCount((c) => c + 1)}
                  aria-label="Increment"
                >
                  +
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example 3: Forms with Validation */}
        <Card>
          <CardHeader>
            <CardTitle>Form Input</CardTitle>
            <CardDescription>
              Accessible form with validation and error handling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText="This value is persisted in localStorage"
            />
            <Input
              label="Email"
              type="email"
              placeholder="email@example.com"
              required
              helperText="Required field"
            />
            <Input
              label="Password"
              type="password"
              error="Password must be at least 8 characters"
              isInvalid
            />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-600">
              Stored name: <strong>{name || 'Not set'}</strong>
            </p>
          </CardFooter>
        </Card>

        {/* Example 4: Debounced Search */}
        <Card>
          <CardHeader>
            <CardTitle>Debounced Search</CardTitle>
            <CardDescription>
              Search input with 500ms debounce using custom hook
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Search"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Current value:</strong> {searchTerm}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Debounced value:</strong> {debouncedSearch}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Example 5: Async Operations */}
        <Card>
          <CardHeader>
            <CardTitle>Async Operations</CardTitle>
            <CardDescription>
              Proper handling of loading states and errors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleAsyncAction}
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Start Async Action'}
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-600">
              Click to simulate a 2-second async operation
            </p>
          </CardFooter>
        </Card>

        {/* Example 6: Responsive Design */}
        <Card>
          <CardHeader>
            <CardTitle>Responsive Design</CardTitle>
            <CardDescription>
              Media query hook for responsive behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm">
                <strong>Device type:</strong>{' '}
                {isMobile ? 'Mobile' : 'Desktop/Tablet'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Resize your browser window to see the change
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Key Best Practices Demonstrated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">TypeScript</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Strict type checking</li>
                <li>Proper interface definitions</li>
                <li>Generic type support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>ARIA attributes</li>
                <li>Keyboard navigation</li>
                <li>Screen reader support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Performance</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Debouncing for inputs</li>
                <li>Proper cleanup in hooks</li>
                <li>Memoization where needed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Code Quality</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Component composition</li>
                <li>Reusable custom hooks</li>
                <li>Clean separation of concerns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}