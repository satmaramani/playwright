const { test, chromium } = require("@playwright/test");

test.only("Browser new Context @newContext @browsercontext", async () => {
  // Launch the browser
  const browser = await chromium.launch();

  // Create a new browser context with various options
  const context = await browser.newContext({
    recordVideo: { dir: "videos/" }, // Enable video recording
    recordHar: { path: "logs/test.har" }, // Enable HAR recording
    recordTrace: {
      name: "trace",
      screenshots: true,
      screenshotsPath: "screenshots/",
    }, // Enable tracing
    viewport: { width: 1200, height: 1200, deviceScaleFactor: 1 }, // Set viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    locale: "en-US", // Set locale
    timezoneId: "America/New_York", // Set timezone
    permissions: ["geolocation", "notifications"], // Grant permissions
  });

  // Create a new page in the browser context
  const page = await context.newPage();

  // Navigate to google.com
  await page.goto("https://www.google.com");

  await page
    .locator("//textarea[@id='APjFqb']")
    .fill("what is my browser location");

  await page.locator("//div[@class='lJ9FBc']//input[@name='btnK']").click();
  await page.waitForEvent("domcontentloaded");

  await page.waitForTimeout(29000);
  page.pause();
  // Close the browser context
  //   await context.close();

  // Close the browser
  //   await browser.close();
});
