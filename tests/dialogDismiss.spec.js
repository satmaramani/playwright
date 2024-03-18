import { chromium, test, expect } from "@playwright/test";
//npx playwright test --project=chromium -g "@dismiss" --headed

test("Dismiss JavaScript Alert Box @dismiss @dialog", async ({ page }) => {
  // Navigate to a page with a JavaScript alert
  await page.goto("http://localhost:9090/dialog/dismiss.html");

  // Listen for dialog events
  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message());

    await page.waitForTimeout(1000);
    expect(dialog.message()).toBe(
      "This is dialog box, please dismiss through Playwright !!"
    );
    await page.waitForTimeout(1000);
    // Dismiss the dialog
    await dialog.dismiss();
  });

  await page.locator("#textbox").fill("Dummy text");
  await page.locator("#submit").click();
});
