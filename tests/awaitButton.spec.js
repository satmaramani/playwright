const { test, chromium, expect } = require("@playwright/test");

test("Selector Wait for 5 seconds @awaitbutton @selectorawait", async () => {
  // Launch the browser
  const browser = await chromium.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the HTML page
  await page.goto("/delay/button.html");

  const buttonLocator = page.locator("#delayed-button");
  let isVisible = await buttonLocator.isVisible();

  expect(isVisible).toBe(false); // Asserting that the button is hidden
  // Wait for the button to appear
  await page.waitForSelector("#delayed-button");

  isVisible = await buttonLocator.isVisible();

  expect(isVisible).toBe(true); // Asserting that the button is hidden

  // Click on the delayed button
  await page.click("#delayed-button");

  // Wait for the displayTextHere element to contain the expected text
  await page.waitForSelector(
    '#displayTextHere:has-text("Somebody Clicked me")'
  );

  expect(
    await page.waitForSelector(
      '#displayTextHere:has-text("Somebody Clicked me")'
    )
  ).toBeTruthy();
  // Click on the "Hide me" button
  await page.click("#delayed-button-2");

  await expect(await page.locator("#displayTextHere").textContent()).toBe(""); // Asserting that the resolved value is an empty object
  // Wait for the displayTextHere element to be empty
  //   await page.waitForSelector('#displayTextHere:has-text("")');

  // Close the browser
  await browser.close();
});
