// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const { off } = require("process");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testMatch: ["**/*.spec.js"],
});

// Exporting projects array
const projects = [
  {
    name: "webkit",
    testDir: "./tests-examples",
    use: {
      browserName: "webkit",
      // Add other browser options or settings specific to WebKit
    },
  },
];

module.exports = {
  config,
  projects,
};
