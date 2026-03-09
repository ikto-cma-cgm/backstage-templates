{%- if values.e2eFramework == 'playwright' %}
/**
 * Basic E2E Tests with Playwright
 *
 * This file demonstrates simple E2E testing patterns compatible with Playwright 1.57:
 * - Page loading and navigation
 * - Basic interactions
 * - Simple assertions
 *
 * Compatible with: Playwright 1.57.0
 */

import { test, expect } from '@playwright/test';

/**
 * Homepage Tests
 *
 * Basic tests to verify homepage loads correctly
 */
test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads successfully', async ({ page }) => {
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Verify page has content
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('displays header', async ({ page }) => {
    // Verify header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('displays footer', async ({ page }) => {
    // Verify footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});

/**
 * Navigation Tests
 *
 * Basic tests for navigation functionality
 */
test.describe('Navigation', () => {
  test('can navigate to examples page', async ({ page }) => {
    await page.goto('/');

    // Click on Examples link if it exists
    const examplesLink = page.getByRole('link', { name: /examples/i });
    if (await examplesLink.isVisible()) {
      await examplesLink.click();
      await expect(page).toHaveURL(/\/examples/);
    }
  });
});

/**
 * Responsive Design Tests
 *
 * Basic tests for responsive behavior
 */
test.describe('Responsive Design', () => {
  test('renders on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify page loads on mobile
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('renders on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Verify page loads on desktop
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
{%- endif %}
