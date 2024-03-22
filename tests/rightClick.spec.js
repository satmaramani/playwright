import { test, expect } from "@playwright/test";

test("Simulate Click Events @rightclick @rightClick", async ({ page }) => {
  // Navigate to the Click Event HTML page
  await page.goto("/events/rightClick.html");

  // Simulate a right-click event
  await page.mouse.click(100, 100, { button: "right" });

  // Wait for a brief moment to allow the color change to take effect
  await page.waitForTimeout(1000);

  // Validate the color change and message after right-click event
  let backgroundColor = await page.$eval("body", (element) => {
    return window
      .getComputedStyle(element)
      .getPropertyValue("background-color");
  });
  expect(backgroundColor).toBe("rgb(0, 128, 0)");

  let message = await page.innerText("body");
  expect(message).toContain("Background color changed to green.");

  // Simulate a left-click event
  await page.mouse.click(100, 100); // Default button is left-click

  // Wait for a brief moment to allow the color change to take effect
  await page.waitForTimeout(1000);

  // Validate the color change and message after left-click event
  backgroundColor = await page.$eval("body", (element) => {
    return window
      .getComputedStyle(element)
      .getPropertyValue("background-color");
  });
  expect(backgroundColor).toBe("rgb(0, 0, 255)"); // Original blue color

  message = await page.innerText("body");
  expect(message).toContain(
    "Left Click Detected: - Now you can Right-click anywhere on this page to change the background color."
  );
});
