{%- if values.testingFramework == 'vitest' %}
/**
 * Basic Unit Tests
 *
 * This file demonstrates simple testing patterns compatible with Vitest 2.x:
 * - Component testing with React Testing Library
 * - Basic assertions
 *
 * Compatible with:
 * - Vitest 2.1.9
 * - React Testing Library 16.3.1
 * - @testing-library/jest-dom 6.9.1
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

/**
 * Basic React Component Tests
 *
 * Simple tests to verify the testing setup works
 */
describe('React Testing Setup', () => {
  it('can render a simple button', () => {
    render(<button>Click me</button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('can render a simple div with text', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it('can check if an element is disabled', () => {
    render(<button disabled>Disabled</button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('can test basic math', () => {
    expect(1 + 1).toBe(2);
  });
});
{%- endif %}
{%- if values.testingFramework == 'jest' %}
/**
 * Basic Unit Tests
 *
 * This file demonstrates simple testing patterns compatible with Jest 30:
 * - Component testing with React Testing Library
 * - Basic assertions
 *
 * Compatible with:
 * - Jest 30.2.0
 * - React Testing Library 16.3.1
 * - @testing-library/jest-dom 6.9.1
 * - jest-environment-jsdom 30.2.0
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Basic React Component Tests
 *
 * Simple tests to verify the testing setup works
 */
describe('React Testing Setup', () => {
  it('can render a simple button', () => {
    render(<button>Click me</button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('can render a simple div with text', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it('can check if an element is disabled', () => {
    render(<button disabled>Disabled</button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('can test basic math', () => {
    expect(1 + 1).toBe(2);
  });
});
{%- endif %}
