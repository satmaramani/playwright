const { test, expect } = require("@playwright/test");

// Common setup steps for all test cases
test.beforeEach(async ({ page }) => {
  await page.goto("/index.html");
  const selector =
    'a:has-text("Arithmetic Operations")[href="/calculation/operations.html"]';
  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);
  await page.waitForTimeout(1000);
});

test("@addition @calculations Addition", async ({ page }) => {
  await page.locator("#num1").fill("10");
  await page.locator("#num2").fill("5");
  await page.locator(".add").click();
  await page.waitForSelector("#output");
  expect(await page.locator("#output").innerText()).toBe("15");
});

test("@subtraction @calculations  Subtraction", async ({ page }) => {
  await page.locator("#num1").fill("10");
  await page.locator("#num2").fill("5");
  await page.locator(".subtract").click();
  await page.waitForSelector("#output");
  expect(await page.locator("#output").innerText()).toBe("5");
});

test("@multiplication  @calculations Multiplication", async ({ page }) => {
  await page.locator("#num1").fill("10");
  await page.locator("#num2").fill("5");
  await page.locator(".multiply").click();
  await page.waitForSelector("#output");
  expect(await page.locator("#output").innerText()).toBe("50");
});

test("@division  @calculations  Division", async ({ page }) => {
  await page.locator("#num1").fill("10");
  await page.locator("#num2").fill("5");
  await page.locator(".divide").click();
  await page.waitForSelector("#output");
  expect(await page.locator("#output").innerText()).toBe("2");
});
