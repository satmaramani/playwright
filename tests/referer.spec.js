const { test, expect } = require("@playwright/test");

test("Navigate to localhost with modified Referer @referer", async ({
  page,
}) => {
  // Set the Referer header to google.com
  await page.setExtraHTTPHeaders({ Referer: "http://www.google.com/" });

  // Navigate to the website
  await page.goto("http://localhost:9090/");

  // Retrieve the current URL and Referer header
  const url = page.url();
  const referrer = await page.evaluate(() => document.referrer);

  console.log(" checking the referre => ", referrer);
  // Assert the current URL and Referer
  expect(url).toBe("http://localhost:9090/");
  expect(referrer).toBe("http://www.google.com/");
});
