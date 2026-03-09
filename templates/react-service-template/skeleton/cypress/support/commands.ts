{%- if values.e2eFramework == 'cypress' %}
/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Example custom command
// Cypress.Commands.add('login', (email: string, password: string) => {
//   cy.visit('/login');
//   cy.get('input[name="email"]').type(email);
//   cy.get('input[name="password"]').type(password);
//   cy.get('button[type="submit"]').click();
// });

// Add custom commands type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      // login(email: string, password: string): Chainable<void>
    }
  }
}

export {};
{%- endif %}