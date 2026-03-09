{%- if values.e2eFramework == 'cypress' %}
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:${{ values.port }}',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    fixturesFolder: 'cypress/fixtures',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    experimentalRunAllSpecs: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      {%- if values.includeCoverage %}
      require('@cypress/code-coverage/task')(on, config);
      {%- endif %}
      return config;
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },
});
{%- endif %}
