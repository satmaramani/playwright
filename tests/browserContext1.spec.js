const { test, chromium, firefox, webkit } = require("@playwright/test");

test("Create two browser contexts @browsercontext", async () => {
  // Launch Chromium browser
  const browserChrome = await chromium.launch();

  // Create the first browser context
  const contextChrome = await browserChrome.newContext();

  // Create a new page within the first context
  const pageChrome = await contextChrome.newPage();

  // Navigate to google.com in the first page
  await pageChrome.goto("https://www.google.com");

  await pageChrome.setContent(
    "This is Chrome Context and Page, I will close this and open firefox Context"
  );
  pageChrome.waitForTimeout(2000);
  const firefoxBrwoser = await firefox.launch();
  // Create the second browser context
  const contextFirefox = await firefoxBrwoser.newContext();

  // Create a new page within the second context
  const pageFirefox = await contextFirefox.newPage();

  // Navigate to google.com in the second page
  await pageFirefox.goto("https://www.stackoverflow.com");

  await pageChrome.setContent(
    "This is firefox Context and Page, I will close this and open webkit Context"
  );
  pageFirefox.waitForTimeout(2000);
  // You can add further actions or assertions here for both contexts/pages

  const webkitBrwoser = await webkit.launch();
  const contextWebkit = await webkitBrwoser.newContext();

  // Create a new page within the second context
  const pageWebkit = await contextWebkit.newPage();

  // Navigate to google.com in the second page
  await pageWebkit.goto("https://playwright.dev/");

  await pageChrome.setContent(
    "This is Webkit Context and Page, Test is completed"
  );
  pageWebkit.waitForTimeout(2000);

  // Close the browser
  await browserChrome.close();
  await firefoxBrwoser.close();
  await webkitBrwoser.close();
});
