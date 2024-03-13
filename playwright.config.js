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
  globalTeardown: "./SamTeardown.js",
  globalSetup: "./samGlobalSetup.js",
  testMatch: ["**/*.test.js", "**/*.spec.js"],
  timeout: 30000,

  globalTimeout: 100000, // 60 seconds
  // grep: /tab2/,
  // outputDir: "samOutPut",
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  // forbidOnly: true,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: "html",//html, dot, list, json
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: "on-first-retry",
    launchOptions: {
      // slowMo: 500,
    },
    viewport: { width: 100, height: 100 },
    // offline: true,
  },
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 100,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },
});

// Exporting projects array
const projects = [
  {
    name: "smoke",
    testMatch: /.*.spec.ts/,
    retries: 0,
  },
  {
    name: "prod",
    testIgnore: /.*smoke.spec.ts/,
    retries: 0,
  },
  {
    name: "default",
    testIgnore: /.*smoke.spec.ts/,
    retries: 2,
  },
  {
    name: "chromium",
    use: {
      browserName: "chromium",
      // Add other browser options or settings specific to Chromium
    },
  },
  {
    name: "firefox",
    use: {
      browserName: "firefox",
      // Add other browser options or settings specific to Firefox
    },
  },
  {
    name: "webkit",
    use: {
      browserName: "webkit",
      // Add other browser options or settings specific to WebKit
    },
  },
];

let webServerConfig;

// if (!process.env.CI) {
//   webServerConfig = {
//     webServer: {
//       name: "Frontend",
//       command:
//         "cd D:/playwright-samples/node-sample-project && nodemon server.js",
//       url: "http://127.0.0.1:9090/node-sample-project/",
//       reuseExistingServer: !process.env.CI,
//     },
//     backendServer: {
//       name: "Backend server",
//       command:
//         "cd D:/playwright-samples/playwright-authentication && nodemon server.js",
//       url: "http://127.0.0.1:9091",
//       reuseExistingServer: !process.env.CI,
//     },
//   };
// }

module.exports = {
  config,
  projects,
  // ...webServerConfig, // Spread the web server configuration into the exports object
};
