const { test, chromium } = require("@playwright/test");

test.describe("Logging in Playwright Test", () => {
  let browser;

  test.beforeAll(async () => {
    // Launch the browser with logging enabled
    browser = await chromium.launch({
      // Enable logging for various events
      logLevel: "verbose", // Set log level to 'verbose' to log more events
      // Log only specific event types
      loggers: {
        browser: (msg) => console.log(`[Browser] ${msg}`),
        browserContext: (msg) => console.log(`[BrowserContext] ${msg}`),
        page: (msg) => console.log(`[Page] ${msg}`),
        network: (msg) => console.log(`[Network] ${msg}`),
        console: (msg) => console.log(`[Console] ${msg.type()}: ${msg.text()}`),
        error: (msg) => console.log(`[Error] ${msg}`),
      },
    });
  });

  test.afterAll(async () => {
    // Close the browser after all tests are completed
    await browser.close();
  });

  test("Navigate to example.com and click a link", async () => {
    // Create a new browser context
    const context = await browser.newContext();

    // Create a new page
    const page = await context.newPage();

    // Navigate to a URL
    await page.goto("https://example.com");

    // Perform some actions on the page
    await page.click("a");

    // Close the context after each test
    await context.close();
  });
});
