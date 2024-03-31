const { test, expect } = require("@playwright/test");

test.describe("Take and Match screenshots @screenshot", async () => {
  test("Take Google page screenshot @screenshot", async ({ page }) => {
    await page.goto("https://google.com");
    await page.screenshot({ path: "google.png" });

    await expect(page).toHaveScreenshot();
  });

  test("Match Google page screenshot @matchscreenshot", async ({ page }) => {
    await page.goto("https://google.com");
    expect(await page.screenshot()).toMatchSnapshot({
      name: "google.png",
    });
  });
});
