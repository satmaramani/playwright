const { test, chromium } = require("@playwright/test");

// Define a Jest test
test("prompt dialog box @prompt ", async () => {
  // Setup: Launch the browser and create a new page
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Test Execution: Define the test logic
    await page.goto("https://example.com");

    // Perform interactions or assertions
    const pageTitle = await page.title();
    console.log("Page Title:", pageTitle);

    // Handle any dialogs or pop-ups
    page.on("dialog", async (dialog) => {
      await page.waitForTimeout(2000);
      await dialog.accept("Your desired input"); // Provide the desired input to the prompt dialog
      //   await dialog.dismiss(); // Dismiss the dialog
    });

    // Trigger an action that opens a dialog
    await page.evaluate(() => window.prompt("This is an alert!"));

    // Other test logic...
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    // Teardown: Close the browser
    await browser.close();
  }
});
