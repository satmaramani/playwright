const { test, expect } = require("@playwright/test");

// Assignment 1: Textbox
test("Textbox Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/textbox.html");
  await page.fill('input[type="text"]', "John Doe");
});

// Assignment 2: Checkbox
test("Checkbox Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/checkbox.html");
  await page.check("input#checkbox1");
  await page.check("input#checkbox2");
});

// Assignment 3: Radio Button
test("Radio Button Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/radio.html");
  await page.click("input#radio1");
});

// Assignment 4: Dropdown
test("Dropdown Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/dropdown.html");
  await page.selectOption("select#dropdown", "Canada");
});

// Assignment 5: Button
test("Button Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/submit.html");
  await page.click("button#submitButton");
});

// Assignment 6: Password Input
test("Password Input Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/password.html");
  await page.fill('input[type="password"]', "secretpassword");
});

// Assignment 7: Textarea
test("Textarea Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/textarea.html");
  await page.fill("textarea", "This is a sample message.");
});

// Assignment 8: Multiple Select
test("Multiple Select Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/multiSelect.html");
  await page.selectOption("select#colors", ["red", "blue"]);
});

// Assignment 9: Headings
test("Headings Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/heading.html");
  const headingText = await page.evaluate(() => {
    return {
      heading1: document.querySelector("h1").innerText,
      heading2: document.querySelector("h2").innerText,
      heading3: document.querySelector("h3").innerText,
    };
  });
  console.log("Headings:", headingText);
});

// Assignment 10: File Upload
test("File Upload Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/fileUpload.html");
  const filePath = "D:/file_list.txt"; // Specify the path to the file to upload
  const fileInput = await page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);
});

// Assignment 11: Drag and Drop
test("Drag and Drop Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/dragAndDrop.html");
  const dragElement = await page.locator("#dragElement");
  const dropZone = await page.locator("#dropZone");
  await dragElement.dragTo(dropZone);
});

// Assignment 12: Image Tag
test("Image Tag Assignment", async ({ page }) => {
  await page.goto("http://localhost:9090/assignments/image.html");
  const imageUrl = await page.evaluate(() => {
    const imgElement = document.querySelector("img");
    imgElement.src =
      "data:image/jpeg;base64,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";

    return imgElement ? imgElement.src : null;
  });
  console.log("Image URL:", imageUrl);
});
