const { test, expect } = require("@playwright/test");

test("Test Mouse and Keyboard Events @events", async ({ page }) => {
  // Navigate to the HTML page
  await page.goto("http://localhost:9090/events/events.html");

  // Click the Single Click button
  await page.click("#singleClickBtn");
  await page.waitForSelector(
    '#eventDisplay:has-text("Button is single clicked")'
  );

  // Double click the Double Click button
  await page.dblclick("#doubleClickBtn");
  await page.waitForSelector(
    '#eventDisplay:has-text("Button is double clicked")'
  );

  // Hover over the Mouse Over button
  await page.hover("#mouseOverBtn");
  await page.waitForSelector('#eventDisplay:has-text("Mouse over button")');

  // Move the mouse out of the Mouse Out button
  await page.hover("#mouseOutBtn"); // Ensure mouse is over the button
  await page.mouse.move(-100, -100); // Move mouse out of the button area
  await page.waitForSelector('#eventDisplay:has-text("Mouse out of button")');

  // Type something in the text input field
  await page.fill("#textInput", "Hello");
  await page.keyboard.press("Enter");
  await page.waitForSelector('#eventDisplay:has-text("Key down event: Enter")');

  // Type something in the text area input field
  await page.fill("#textAreaInput", "World");
  await page.keyboard.press("Enter");
  await page.waitForSelector('#eventDisplay:has-text("Key up event: Enter")');
});
