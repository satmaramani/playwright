const { test, expect } = require("@playwright/test");

test("Verify calculator operations in iframe @iframe", async ({ page }) => {
  // Navigate to the parent page containing the iframe
  await page.goto("http://127.0.0.1:5500/public/frames/frames.html");

  // Access the iframe element
  const iframeElement = await page.$("#iframe2");

  // Switch to the iframe context
  const iframe = await iframeElement.contentFrame();

  // Verify that the iframe content is loaded
  expect(iframe).not.toBeNull();

  // Perform calculator operations
  await iframe.fill("#num1", "10"); // Enter number 10 in the first input
  await iframe.fill("#num2", "5"); // Enter number 5 in the second input

  // Click on the 'Add' button
  await iframe.click(".add");

  await page.waitForTimeout(2000);
  // Verify the result
  const result = await iframe.innerText("#output");
  expect(result).toBe("15");

  // Perform more operations and assertions as needed
});
