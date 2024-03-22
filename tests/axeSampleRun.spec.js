const { test, expect } = require("./axeTest");
import { createHtmlReport } from "axe-html-reporter";
const fs = require("fs");

test("example using custom fixture @axeSampleTestGoogle", async ({
  page,
  makeAxeBuilder,
}) => {
  await page.goto("https://google.com/");
  await page.waitForLoadState("domcontentloaded");

  const results = await makeAxeBuilder().analyze();
  //   console.log(results);

  const reportHTML = createHtmlReport({
    results,
    options: {
      projectKey: "Google",
    },
  });

  const fileName = "build/reports/accessibility-report-google.html";
  if (!fs.existsSync(fileName)) {
    fs.mkdirSync("build/reports", {
      recursive: true,
    });
  }
  fs.writeFileSync(fileName, reportHTML);

  //   expect(accessibilityScanResults.violations).toEqual([]);
});

test("example using custom fixture @axeSampleTestPlaywright", async ({
  page,
  makeAxeBuilder,
}) => {
  await page.goto("https://playwright.dev/");
  await page.waitForLoadState("domcontentloaded");

  const results = await makeAxeBuilder().analyze();
  //   console.log(results);

  const reportHTML = createHtmlReport({
    results,
    options: {
      projectKey: "Playwright",
    },
  });

  const fileName = "build/reports/accessibility-report-playwrightDev.html";
  if (!fs.existsSync(fileName)) {
    fs.mkdirSync("build/reports", {
      recursive: true,
    });
  }
  fs.writeFileSync(fileName, reportHTML);
});
