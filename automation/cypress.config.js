const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",

    viewportWidth: 1440,
    viewportHeight: 1000,
    pageLoadTimeout: 120000, // Increased timeout for slow loading pages
    setupNodeEvents(on, config) {
      return config;
    },
  },
});