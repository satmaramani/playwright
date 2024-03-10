const { test, expect } = require("@playwright/test");

test.beforeEach("Start", async ({ page }) => {
  const selector =
    'a:has-text("The Tabs show")[href="http://localhost:9090/tab/all.html"]';
  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);
  await page.waitForTimeout(1000);
});

test("test Fast Tag tag1 @tab", async ({ page }) => {
  console.log("  I am here ");
  expect(true).toBeTruthy();
});

test("test Slow Tag  tag2 @tab", async () => {
  console.log("  I am here ");
  expect(true).toBeTruthy();
});

test(
  "tab 2",
  {
    tag: "@tab2",
  },
  async ({ page }) => {
    await page.locator(".tab-item.tab-2").click();
    console.log("Clicked element:", ".tab-item.tab-2");
    expect(await page.locator(".tab-content.tab-2").textContent()).toBe(
      "Content for Tab 2"
    );
  }
);

test("Tab 3 @tab", async ({ page }) => {
  await page.locator(".tab-item.tab-3").click();
  expect(await page.locator(".tab-content.tab-3").textContent()).toBe(
    "Content for Tab 3"
  );
});

test("Tab 4 @tab", async ({ page }) => {
  await page.locator(".tab-item.tab-4").click();
  expect(await page.locator(".tab-content.tab-4").textContent()).toBe(
    "Content for Tab 4"
  );
});

test("Tab 1 @tab", async ({ page }) => {
  await page.locator(".tab-item.tab-1").click();
  expect(await page.locator(".tab-content.tab-1").textContent()).toBe(
    "Content for Tab 1"
  );
});
