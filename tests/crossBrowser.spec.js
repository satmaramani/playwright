import { test, chromium, webkit } from "@playwright/test";

test("Dynamic transition from Chromium to WebKit", async ({}) => {
  let newPageUrl;
  let newPage;

  // Launch Chromium browser
  const chromiumBrowser = await chromium.launch();
  const chromiumContext = await chromiumBrowser.newContext();
  const chromiumPage = await chromiumContext.newPage();

  // Intercept the new window opening event
  chromiumContext.on("page", async (page) => {
    newPage = page;

    // Wait for the new page to load
    await newPage.waitForLoadState();

    // Extract the URL from the new page
    newPageUrl = newPage.url();
  });

  // Navigate to the page containing the button in Chromium
  await chromiumPage.goto(
    "http://localhost:9090/openPageNewWindow/sourcePage.html"
  );

  // Click on the button to trigger the new window opening event
  await chromiumPage.click('button[onclick="openInWindow()"]');

  // Wait for the new page to be loaded
  await chromiumPage.waitForLoadState("networkidle");

  await chromiumPage.waitForTimeout(2000);

  // Close the Chromium browser
  await chromiumBrowser.close();

  // Launch WebKit browser
  const webKitBrowser = await webkit.launch();
  const webKitContext = await webKitBrowser.newContext();
  const webKitPage = await webKitContext.newPage();

  await webKitPage.waitForTimeout(2000);

  // Navigate to the URL in WebKit
  await webKitPage.goto(newPageUrl);

  // Launch WebKit browser
  const firefoxBrowser = await webkit.launch();
  const firefoxContext = await firefoxBrowser.newContext();
  const firefoxPage = await firefoxContext.newPage();

  await firefoxPage.waitForTimeout(2000);

  // Navigate to the URL in WebKit
  await firefoxPage.goto(newPageUrl);

  // Continue interacting with the opened page in WebKit as needed
});
