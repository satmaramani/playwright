const { test, expect } = require("@playwright/test");
const fs = require("fs");

test.beforeEach("Before Each", async ({ page }) => {
  await page.goto("http://localhost:9090/index.html");
  const selector =
    'a:has-text("Upload / Download Pages")[href="http://localhost:9090/upload/uploadDownload.html"]';
  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);
  await page.waitForTimeout(1000);
});

test("@download @upload Upload file", async ({ page }) => {
  // File path to upload
  const filePath = "D:/Downloaders/Sam employee_list.txt";

  // Selector for the file input element
  const fileInputSelector = "input[type=file]";

  // Set the value of the file input to the file path
  await page.setInputFiles(fileInputSelector, filePath);

  await page.locator("//button[@onclick='uploadFile()']").click();

  // Wait for the file to be uploaded (optional)
  await page.waitForTimeout(2000); // Adjust the timeout as needed

  const employeeListText = await page
    .locator("//textarea[@id='employeeList']")
    .innerText(); // Replace '#employeeList' with the selector of your textarea

  console.log("This is text inside textarea");
  console.log(employeeListText);
  // Write the contents to a file
  const filePath1 = "D:/sam2103202412noon.txt"; // Specify the path where you want to save the downloaded file
  fs.writeFileSync(filePath1, employeeListText);

  // File path to upload
  // Click on the element that triggers the file download
  await page.click("//button[@onclick='downloadFile()']"); // Replace 'button.download-button' with the selector of the download button

  // Wait for the download to start (you might need to adjust the timeout)
  await page.waitForTimeout(2000); // Adjust the timeout as needed

  // Handle the download dialog
  const [download] = await Promise.all([
    page.waitForEvent("download"), // Wait for the download to start
    page
      .waitForSelector("//button[@onclick='downloadFile()']")
      .then((button) => button.click()), // Click on the download button again (if necessary)
  ]);

  // Save the file to a specific location

  await download.saveAs(filePath1);
});
