const { test, expect } = require("@playwright/test");

test("@geolocation Login from the United States", async ({ browser }) => {
  const context = await browser.newContext({
    geolocation: { latitude: 37.7749, longitude: -122.4194 }, // Coordinates for San Francisco, California
    permissions: ["geolocation"],
  });
  const page = await context.newPage();

  // Your test code here: navigate to the login page and perform login actions

  await page.goto("https://www.google.com/maps/");
  await page.waitForTimeout(2000);

  await page.locator("//input[@id='searchboxinput']").fill("pune");
  // Perform login actions

  await page.waitForTimeout(2000);
  await page.locator("//span[@class='google-symbols']").click();
  await page.waitForTimeout(2000);

  await context.close();
});
