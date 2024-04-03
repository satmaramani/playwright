import { test, expect } from "@playwright/test";

test("Viewport feature-b example test @viewport500 @viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 200, height: 1200 });

  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.use({ viewport: { width: 1000, height: 500 } });

test("feature-b example test @viewport500 @viewport", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 200, height: 300 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

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
