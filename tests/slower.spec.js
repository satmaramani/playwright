const { test, expect, chromium, browser } = require("@playwright/test");

test.beforeEach("Start", async () => {
  const browser = await chromium.launch({
    slowMo: 5000, // 100 milliseconds of slow motion
  });
  console.log("  Slow motion ");
  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page in the context
  const page = await context.newPage();

  await page.goto("/index.html");
  const selector = 'a:has-text("The Tabs show")[href="/tab/all.html"]';
  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);
  await page.waitForTimeout(1000);
});

test("test Fast Tag @normal ", async ({ page }) => {
  console.log("  I am here ");
  expect(true).toBeTruthy();
});

test("test Slow Tag @slower ", async () => {
  console.log("  I am here ");
  expect(true).toBeTruthy();
});

test(
  "tab 2",
  {
    tag: "@slower",
  },
  async ({ page }) => {
    await page.locator(".tab-item.tab-2").click();
    console.log("Clicked element:", ".tab-item.tab-2");
    expect(await page.locator(".tab-content.tab-2").textContent()).toBe(
      "Content for Tab 2"
    );
  }
);

test("Tab 3 @slower", async ({ page }) => {
  await page.locator(".tab-item.tab-3").click();
  expect(await page.locator(".tab-content.tab-3").textContent()).toBe(
    "Content for Tab 3"
  );
});

test("Tab 4 @slower", async ({ page }) => {
  await page.locator(".tab-item.tab-4").click();
  expect(await page.locator(".tab-content.tab-4").textContent()).toBe(
    "Content for Tab 4"
  );
});

test("Tab 1 @slower", async ({ page }) => {
  await page.locator(".tab-item.tab-1").click();
  expect(await page.locator(".tab-content.tab-1").textContent()).toBe(
    "Content for Tab 1"
  );
});
