const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      baseUrl: 'https://test-qa.inlaze.com',
      supportFile: false,
      setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
