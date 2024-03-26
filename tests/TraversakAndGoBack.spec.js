const { chromium, test, expect } = require("@playwright/test");

test("Go back and go Forward @goback @traversal", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const page2 = await context.newPage();

  await page.goto("/index.html");
  await page2.goto("stackoverflow.com");

  // Click on the link to go to the traversal page
  await page.locator("//a[normalize-space()='Traversal Pages']").click();
  await page.waitForURL("**/page1.html");

  console.log(`I am on page => ${page.url} - Going to page 2`);
  await page.locator("//a[normalize-space()='Go to Page 2']").click();
  await page.waitForURL("**/page2.html");

  console.log(`I am on page => ${page.url} - Going to page 3`);

  await page.locator("//a[normalize-space()='Go to Page 3']").click();
  await page.waitForURL("**/page3.html");

  console.log(`I am on page => ${page.url} - Going to page 4`);

  await page.locator("//a[normalize-space()='Go to Page 4']").click();
  await page.waitForURL("**/page4.html");

  console.log(
    `Going Back now => I am on page => ${page.url} - Going to page 3`
  );
  await page.goBack();
  await page.waitForURL("**/page3.html");
  console.log(
    `Going Back again => I am on page => ${page.url} - Going to page 2`
  );

  await page.goBack();
  await page.waitForURL("**/page2.html");
  console.log(
    `Going Back again => I am on page => ${page.url} - Going to page 1`
  );

  await page.goBack();
  await page.waitForURL("**/page1.html");
  console.log(
    `Going forward now => I am on page => ${page.url} - Going to page 1`
  );

  await page.goForward();
  await page.waitForURL("**/page2.html");

  await page.reload();
  console.log(
    `Done with transitions => I am on page => ${page.url} - not going anywhere !!`
  );

  await browser.close();
});
