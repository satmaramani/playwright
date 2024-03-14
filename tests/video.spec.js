const { test, chromium } = require("@playwright/test");

test("Take Google page video @video", async () => {
  const browser = await chromium.launch();

  // Create a new browser context with video recording enabled
  const context = await browser.newContext({ recordVideo: { dir: "videos/" } });

  // Create a new page in the browser context
  const page = await context.newPage();

  await page.goto("https://google.com");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getUTCMonth();
  const day = date.getDay();

  // Close the browser context
  await context.close();

  // Close the browser
  await browser.close();
});
