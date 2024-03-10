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
module.exports = defineConfig({
  globalTeardown: "./samTeardown.js",
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
    slowMo: 10000,
    // offline: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], acceptDownloads: true },
      timeout: 10000,
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        headless: true,
        artifactsDir: "ARTIFACTSDir",
        screenshots: "on",
        slowMo: 5000,
        timeout: 50000,
        // video: "off",
      },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], headless: true },
      timeout: 12000,
    },

    /* Test against mobile viewports. */
    {
      name: "MobileChrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "MobileChromeViewPort",
      use: {
        viewport: { width: 360, height: 640 },
        // Add other browser options as needed
      },
    },
    {
      name: "MobileSafari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "mutipleDevices",
      use: [
        { ...devices["Pixel 5"] },
        { ...devices["iPhone 12"] },
        { ...devices["Galaxy S20"] },
        { ...devices["iPad Mini"] },
        { ...devices["Nexus 7"] },
        { ...devices["iPhone SE"] },
        { ...devices["Nexus 7"] },
      ],
    },

    /* Test against branded browsers. */
    {
      name: "MicrosoftEdge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "GoogleChrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "cd D:/node-sample-project && nodemon server.js",
    url: "http://127.0.0.1:9090",
    reuseExistingServer: !process.env.CI,
  },
});
