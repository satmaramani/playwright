import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
const fs = require("fs");

test.describe("Playwright Homepage @accessibility", () => {
  test("Verify there is no accessibility issues", async ({ page }) => {
    await page.goto("https://playwright.dev");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "PlaywrightHomepage",
      },
    });

    if (!fs.existsSync("build/reports/accessibility-report.html")) {
      fs.mkdirSync("build/reports", {
        recursive: true,
      });
    }
    fs.writeFileSync("build/reports/accessibility-report.html", reportHTML);

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
