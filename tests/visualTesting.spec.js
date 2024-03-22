const { test, expect } = require("@playwright/test");
const fs = require("fs");

// Define a Playwright test with the tag @visual
test("Visual Testing Example @visual", async ({ page }) => {
  const baselinePath = "baseLineGoogleImg.png";
  const url = "https://google.com";

  // Check if baseline image exists
  if (!fs.existsSync(baselinePath)) {
    // If baseline image doesn't exist, capture a screenshot and save it as the baseline image
    await captureScreenshot(page, baselinePath, url);
    console.log("Baseline image captured successfully.");
  } else {
    // If baseline image exists, capture a screenshot and compare it with the baseline image
    const screenshotPath = "screenshotToCompare.png";
    await captureScreenshot(page, screenshotPath, url);

    // Read the actual screenshot data from the file
    const actualScreenshot = fs.readFileSync(screenshotPath);

    // Read the baseline screenshot data from the file
    const baselineScreenshot = fs.readFileSync(baselinePath);

    // Compare the actual screenshot with the baseline screenshot
    expect(actualScreenshot).toEqual(baselineScreenshot);
  }
});

// Function to capture a screenshot and save it to a file
async function captureScreenshot(page, path, url) {
  await page.goto(url);
  const screenshot = await page.screenshot();
  fs.writeFileSync(path, screenshot);
}
