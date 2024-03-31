const { test, expect } = require("@playwright/test");

test("Drag & Drop example @drag @drop @dragAndDrop", async ({ page }) => {
  await page.goto("/dragAndDrop/dragAndDrop.html");

  // Get handles to drag and drop elements
  const dragElement = await page.$("#dragElement");
  const dropTarget = await page.$("#dropTarget");

  // Evaluate the background color of the drop target element
  const bgColorPre = await dropTarget.evaluate((elem) => {
    return window.getComputedStyle(elem).getPropertyValue("background-color");
  });

  // Verify the background color
  await expect(bgColorPre).toBe("rgba(0, 0, 0, 0)"); // Adjust the color value as needed

  // Perform drag and drop action
  await page.locator("#dragElement").dragTo(page.locator("#dropTarget"));
  // await dragElement.dragTo(dropTarget);
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

  await page.locator("#resetButton").click();
  await expect(await page.locator("#dropTarget").textContent()).toBe(
    "Drop here!"
  );

  // Evaluate the background color of the drop target element
  const bgColorPost = await dropTarget.evaluate((elem) => {
    return window.getComputedStyle(elem).getPropertyValue("background-color");
  });

  // Verify the background color
  await expect(bgColorPost).toBe("rgba(0, 0, 0, 0)"); // Adjust the color value as needed
});
