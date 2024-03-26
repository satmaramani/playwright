const { test, chromium, firefox, webkit } = require("@playwright/test");

test("Create two browser contexts @browsercontext", async () => {
  ///// START Browser Launching
  // Part 1 Launch Chromium browser
  const browserChrome = await chromium.launch();

  ///// end Browser Launching

  ///// START Conext Creation
  // Create the first browser context
  const contextChrome = await browserChrome.newContext();

  //// END Context Creation

  //// Start Page Creation
  // Create a new page within the first context
  const pageChrome = await contextChrome.newPage();

  //// End Page Creation

  // Navigate to google.com in the first page
  await pageChrome.goto("https://www.google.com");

  await pageChrome.waitForTimeout(3000);
  await pageChrome.setContent(
    "This is Chrome Context and Page, I will close this and open firefox Context"
  );
  pageChrome.waitForTimeout(2000);

  //// Start Firefox browser Launch
  const firefoxBrwoser = await firefox.launch();

  //// End Firefox browser Launch

  //// Start Firefox Context Object creation
  // Create the second browser context
  const contextFirefox = await firefoxBrwoser.newContext();

  //// End Firefox Context Object creation

  //// Start Firefox page

  // Create a new page within the second context
  const pageFirefox = await contextFirefox.newPage();

  // const pageFirefox2 = await contextFirefox.newPage();

  //// End Firefox page

  // Navigate to google.com in the second page
  await pageFirefox.goto("https://www.stackoverflow.com");
  // await pageFirefox2.goto("https://stackoverflow.com");

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
