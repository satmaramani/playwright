const { test, expect } = require("@playwright/test");

test("I am writing this in front of trainees & Friends @duringTraining ", async ({
  page,
}) => {
  await page.goto("https://google.com");

  await page.waitForLoadState();
  await page.locator("//textarea[@id='APjFqb']").fill("synechron Pune");
  await page.waitForLoadState();
  await page.waitForTimeout(5000);
});
