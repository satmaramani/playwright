const { test } = require("@playwright/test");

test("Take Google page screenshot @screenshot", async ({ page }) => {
  await page.goto("https://google.com");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getUTCMonth();
  const day = date.getDay();

  await page.screenshot({ path: `google_${year}-${month}-${day}.png` });
});
