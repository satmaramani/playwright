const { test } = require("@playwright/test");

test.describe.configure({ mode: "serial" });

/** @type {import('@playwright/test').Page} */
let page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://playwright.dev/");
});

test.afterAll(async () => {
  await page.close();
});

test("runs first @reusepage @reusepage1 @beforeEach", async () => {
  await page.goto("https://playwright.dev/");
});

test("runs second @reusepage @reusepage2 @beforeEach", async () => {
  await page.getByText("Get Started").click();
});
