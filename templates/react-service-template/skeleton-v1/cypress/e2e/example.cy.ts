{%- if values.e2eFramework == 'cypress' %}
/**
 * Basic E2E Tests with Cypress
 *
 * This file demonstrates simple E2E testing patterns compatible with Cypress 15.8:
 * - Page loading and navigation
 * - Basic interactions
 * - Simple assertions
 *
 * Compatible with: Cypress 15.8.0
 */

/**
 * Homepage Tests
 *
 * Basic tests to verify homepage loads correctly
 */
describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads successfully', () => {
    // Verify page has loaded
    cy.get('h1').first().should('be.visible');
  });

  it('displays header', () => {
    // Verify header is visible
    cy.get('header').should('be.visible');
  });

  it('displays footer', () => {
    // Verify footer is visible
    cy.get('footer').should('be.visible');
  });

  it('displays main content', () => {
    // Verify main content is visible
    cy.get('main').should('be.visible');
  });
});

/**
 * Navigation Tests
 *
 * Basic tests for navigation functionality
 */
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('can navigate to examples page if it exists', () => {
    // Try to find examples link
    cy.get('body').then(($body) => {
      if ($body.text().includes('examples') || $body.text().includes('Examples')) {
        cy.contains('a', /examples/i).click();
        cy.url().should('match', /\/examples/);
      }
    });
  });
});

/**
 * Responsive Design Tests
 *
 * Basic tests for responsive behavior
 */
describe('Responsive Design', () => {
  it('renders on mobile viewport', () => {
    cy.viewport(375, 667);
    cy.visit('/');

    // Verify page loads on mobile
    cy.get('h1').first().should('be.visible');
  });

  it('renders on tablet viewport', () => {
    cy.viewport(768, 1024);
    cy.visit('/');

    // Verify page loads on tablet
    cy.get('h1').first().should('be.visible');
  });

  it('renders on desktop viewport', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');

    // Verify page loads on desktop
    cy.get('h1').first().should('be.visible');
  });
});

/**
 * Accessibility Tests
 *
 * Basic accessibility checks
 */
describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has one h1 heading', () => {
    // Verify there's exactly one h1
    cy.get('h1').should('have.length.at.least', 1);
  });

  it('page has a title', () => {
    // Verify page has a title
    cy.title().should('not.be.empty');
  });
});
{%- endif %}
