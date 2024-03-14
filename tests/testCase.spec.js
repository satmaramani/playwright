const { test, expect } = require("@playwright/test");

test(
  "Example test case for testInfo Variables @testinfo @testInfo",
  {
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  async ({ page }, testInfo) => {
    // Accessing test case properties and methods via context.testInfo

    //   testInfo.skip();
    testInfo.slow();
    testInfo.setTimeout(testInfo.timeout + 30000);

    if (testInfo) {
      console.log("config ", testInfo.config);
      console.log("Test case title:", testInfo.title);
      console.log("Test case location:", testInfo.location);
      console.log("Test case status:", testInfo.status);
      console.log("Test case attributes:", testInfo.attributes);
      console.log("Annotations ", testInfo.annotations);
      console.log("column ", testInfo.column);

      console.log("duration ", testInfo.duration);
      console.log("error ", testInfo.error);
      console.log("errors ", testInfo.errors);
      console.log("expectedStatus ", testInfo.expectedStatus);
      console.log("file ", testInfo.file);
      console.log("fn ", testInfo.fn);
      console.log("line ", testInfo.line);
      console.log("outputDir ", testInfo.outputDir);
      console.log("parallelIndex ", testInfo.parallelIndex);
      console.log("project ", testInfo.project);
      console.log("repeatEachIndex ", testInfo.repeatEachIndex);
      console.log("retry ", testInfo.retry);
      console.log("snapshotDir ", testInfo.snapshotDir);
      console.log("snapshotSuffix ", testInfo.snapshotSuffix);
      console.log("status  ", testInfo.status);
      console.log("testId ", testInfo.testId);
      console.log("timeout ", testInfo.timeout);
      console.log("titlePath ", testInfo.titlePath);
      console.log("workerIndex ", testInfo.workerIndex);

      // Adding attachments
      testInfo.attach("Screenshot", {
        name: "screenshot.png",
        path: "/path/to/screenshot.png",
      });

      // Expected to fail
      // testInfo.expectFail();

      // Fail the test case
      testInfo.fail("Test case failed");

      // Mark as flaky
      testInfo.flaky();

      // Mark as slow
      testInfo.slow();
    } else {
      console.log("Test info is unavailable.");
    }
  }
);

test(
  "basic test",
  {
    tags: "@sam",
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  async ({ page }, testInfo) => {
    await page.goto("https://playwright.dev/");
    console.log(testInfo.annotations);
    // ...
  }
);
