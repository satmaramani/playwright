const { test, chromium } = require("@playwright/test");

// Define a Jest test
test("Handle confirm dialog @confirm @confirmBox @confirmAlertBox", async () => {
  // Setup: Launch the browser and create a new page
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Intercept the confirm dialog
    page.on("dialog", async (dialog) => {
      console.log("Dialog message:", dialog.message()); // Log the dialog message

      // Handle the dialog based on your requirement
      // For example, you can accept the dialog (click "OK") or dismiss it (click "Cancel")
      // Here, we accept the dialog if the message is 'Are you sure?'
      if (dialog.message() === "Are you sure?") {
        await page.waitForTimeout(2000);
        console.log("Message is correct !!");
        await dialog.accept(); // Click "OK"
      } else {
        await page.waitForTimeout(2000);
        console.log(
          "Message is wrong !!, it should have been ",
          dialog.message()
        );
        await page.waitForTimeout(2000);
        await dialog.dismiss(); // Click "Cancel"
      }
    });

    // Navigate to a page that triggers a confirm dialog
    await page.goto("https://example.com");

    // Trigger an action that triggers the confirm dialog, for example:
    await page.evaluate(() => {
      window.confirm("ACBCD ");
    });

    // Other test logic...
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    // Teardown: Close the browser
    await browser.close();
  }
});
