const { chromium, test } = require("@playwright/test");

test("Browser Debugging Test @debugBrowser", async () => {
  // Launch browser with debugging enabled
  const browser = await chromium.launch({
    headless: false,
    args: [`--auto-open-devtools-for-tabs`, `--disable-extensions`],
  });

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page in the browser context
  const page = await context.newPage();

  // Enable debugging for the browser context
  const cdpSession = await context.newCDPSession(page);

  // Subscribe to Network and Page events for debugging
  await cdpSession.send("Network.enable");
  await cdpSession.send("Page.enable");

  // Log network requests
  cdpSession.on("Network.requestWillBeSent", (event) => {
    console.log("Request:", event.request.url);
  });

  // Log page events
  cdpSession.on("Page.loadEventFired", () => {
    console.log("Page loaded");
  });

  // Navigate to a website
  await page.goto("http://localhost:9090");

  // Perform some actions on the page
  await page.click("a");

  // Close the browser
  await browser.close();
});
