const { test, expect } = require("@playwright/test");

test("Verify calculator operations in iframe @iframe", async ({ page }) => {
  // Navigate to the parent page containing the iframe
  await page.goto("http://127.0.0.1:5500/public/frames/frames.html");

  // Access the iframe element
  const iframeElement2 = await page.$("#iframe2");

  // Switch to the iframe context
  const iframe2 = await iframeElement2.contentFrame();

  // Verify that the iframe content is loaded
  expect(iframe2).not.toBeNull();

  // Perform calculator operations
  await iframe2.fill("#num1", "10"); // Enter number 10 in the first input
  await iframe2.fill("#num2", "5"); // Enter number 5 in the second input

  // Click on the 'Add' button
  await iframe2.click(".add");

  await page.waitForTimeout(2000);
  // Verify the result
  const result = await iframe2.innerText("#output");
  expect(result).toBe("15");

  // Perform more operations and assertions as needed
});

test("Verify Drag and drop operations in iframe 2 @iframe", async ({
  page,
}) => {
  // Navigate to the parent page containing the iframe
  await page.goto("http://127.0.0.1:5500/public/frames/frames.html");

  // Access the iframe element
  const iframeElement1 = await page.$("#iframe1");

  // Switch to the iframe context
  const iframe1 = await iframeElement1.contentFrame();

  // Verify that the iframe content is loaded
  expect(iframe1).not.toBeNull();

  //##
  // Get handles to drag and drop elements
  const dragElement = await iframe1.$("#dragElement");
  const dropTarget = await iframe1.$("#dropTarget");

  // Evaluate the background color of the drop target element
  const bgColorPre = await dropTarget.evaluate((elem) => {
    return window.getComputedStyle(elem).getPropertyValue("background-color");
  });

  // Verify the background color
  await expect(bgColorPre).toBe("rgba(0, 0, 0, 0)"); // Adjust the color value as needed

  // Perform drag and drop action
  await iframe1.locator("#dragElement").dragTo(iframe1.locator("#dropTarget"));
  //   await dragElement.dragAndDrop(dropTarget);

  // Verify if drop target text is updated
  const dropTargetText = await dropTarget.innerText();
  await expect(dropTargetText).toBe("Dragged element");

  // Evaluate the background color of the drop target element
  const bgColor = await dropTarget.evaluate((elem) => {
    return window.getComputedStyle(elem).getPropertyValue("background-color");
  });

  // Verify the background color
  await expect(bgColor).toBe("rgb(0, 128, 0)"); // Adjust the color value as needed

  await iframe1.locator("#resetButton").click();
  await expect(await iframe1.locator("#dropTarget").textContent()).toBe(
    "Drop here!"
  );

  // Evaluate the background color of the drop target element
  const bgColorPost = await dropTarget.evaluate((elem) => {
    return window.getComputedStyle(elem).getPropertyValue("background-color");
  });

  // Verify the background color
  await expect(bgColorPost).toBe("rgba(0, 0, 0, 0)"); // Adjust the color value as needed
  //##

  // Perform more operations and assertions as needed
});
