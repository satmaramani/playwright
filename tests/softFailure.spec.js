const { test, expect } = require("@playwright/test");

test("Soft failure example @soft @softfailure", async ({ page }) => {
  try {
    // Perform actions to test functionality
    await page.goto("https://example.com");

    // Make an assertion that may fail
    await expect.soft(await page.title()).toBe("Expected Title");
  } catch (error) {
    // Handle the soft failure
    console.warn("Soft failure occurred:", error.message);
  }
});
test("runs first @soft @softfailure", async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("runs second @soft @softfailure", async ({ page }) => {
  await page.getByText("Get Started").click();
});
