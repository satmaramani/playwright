const { test } = require("@playwright/test");

test.describe.configure({ mode: "serial" });

/** @type {import('@playwright/test').Page} */
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test("runs first @reusepage @reusepage1", async () => {
  await page.goto("https://playwright.dev/");
});

test("runs second @reusepage @reusepage2", async () => {
  await page.getByText("Get Started").click();
});
