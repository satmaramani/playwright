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
  testMatch: ["**/*.spec.ts"],
});

// Exporting projects array
const projects = [
  {
    name: "chromium",
    testDir: "./typescript",
    use: {
      browserName: "chromium",
      // Add other browser options or settings specific to WebKit
    },
  },
];

module.exports = {
  config,
  projects,
};
