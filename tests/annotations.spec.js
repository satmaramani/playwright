import { test, expect } from "@playwright/test";

test(
  "test login page @annotation",
  {
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  async ({ page }) => {
    console.log(" I am here on annotations page ");
    // ...
  }
);

test.describe(
  "report tests @annotation",
  {
    annotation: { type: "category", description: "report" },
  },
  () => {
    test("test report header", async ({ page }) => {
      // ...
    });

    test(
      "test full report",
      {
        annotation: [
          {
            type: "issue",
            description: "https://github.com/microsoft/playwright/issues/23180",
          },
          { type: "performance", description: "very slow test!" },
        ],
      },
      async ({ page }) => {
        page.getByAttribute();
      }
    );
  }
);

test.describe("chromium only", () => {
  test(
    ({ browserName }) => browserName !== "chromium",
    "This is for Chromium only!"
  );

  test.beforeAll(async () => {
    // This hook is only run in Chromium.
  });

  test("test 1", async ({ page }) => {
    // This test is only run in Chromium.
  });

  test("test 2", async ({ page }) => {
    // This test is only run in Chromium.
  });
});
