const { chromium, test } = require("@playwright/test");

test("Go back and go Forward @goback", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();

  // Navigate to page1.html
  await page.goto("http://localhost:9090/traversal/page1.html");

  // Navigate to page2.html
  await page.goto("http://localhost:9090/traversal/page2.html");

  // Navigate to page3.html
  await page.goto("http://localhost:9090/traversal/page3.html");

  // Navigate to page4.html
  await page.goto("http://localhost:9090/traversal/page4.html");

  await page.waitForTimeout(2000);
  console.log(` now I am at ${page.url()} =>  Go back to page3.html`);

  await page.goBack();

  await page.waitForTimeout(2000);

  console.log(` now I am at ${page.url()} => Go back to page2.html`);

  await page.goBack();

  await page.waitForTimeout(2000);

  console.log(` now I am at ${page.url()} => Go forward to page3.html`);

  await page.goForward();

  console.log(` now I am at ${page.url()} => Go forward to page4.html`);

  await page.goForward();

  await page.waitForTimeout(2000);
  await browser.close();
});
