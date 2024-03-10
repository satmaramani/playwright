// @ts-check
const { test, expect } = require("@playwright/test");

test("has title @title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link @link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("click Yarn tab @tab", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");

  // Click the get started link.
  await page.locator("li[class='tabs__item tabItem_LNqP']").nth(0).click();

  let textContent = await page
    .locator("span[class='token plain']")
    .nth(1)
    .textContent();

  await expect(textContent).toBe(" create playwright");
  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
