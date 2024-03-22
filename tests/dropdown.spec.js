const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/index.html");
  const selector = 'a:has-text("The Dropdown")[href="/dropdown/all.html"]';
  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);
  await page.waitForTimeout(1000);
});

test("Start Option 1 @dropdown", async ({ page }) => {
  await page.locator("#dropdown").selectOption("option1");
  expect(await page.locator("#displayArea").textContent()).toBe("Option 1");
});

test("Start Option 2 @dropdown", async ({ page }) => {
  await page.locator("#dropdown").selectOption("option2");
  expect(await page.locator("#displayArea").textContent()).toBe("Option 2");
});

test("Start Option 3 @dropdown", async ({ page }) => {
  await page.locator("#dropdown").selectOption("option3");
  expect(await page.locator("#displayArea").textContent()).toBe("Option 3");
});

test("Start Option 4 @dropdown", async ({ page }) => {
  await page.locator("#dropdown").selectOption("option4");
  expect(await page.locator("#displayArea").textContent()).toBe("Option 4");
});

test("Start No Option @dropdown", async ({ page }) => {
  await page.locator("#dropdown").selectOption("option0");
  expect(await page.locator("#displayArea").textContent()).toBe(
    "Select at least one"
  );
});
