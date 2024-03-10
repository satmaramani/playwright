import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 500, height: 500 } });

test("feature-b example test @viewport500 @viewport", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.use({ viewport: { width: 200, height: 200 } });

test("feature-b example test @viewport200 @viewport", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
