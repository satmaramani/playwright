import { test, expect } from "@playwright/test";

test.describe("french language block @describe", () => {
  test.use({ locale: "fr-FR" });

  test("describe test 1 @describetest1", async ({ page }) => {
    console.log("Running tests with the following settings:");
    console.log("Headed mode:", process.env.HEADLESS ? "No" : "Yes");
    console.log("Browser:", process.env.BROWSER);
    console.log("Viewport size:", process.env.VIEWPORT);
    // ...
  });

  test("describe test 2 @describetest2", async ({ page }) => {
    console.log("Viewport size:", process.env.VIEWPORT);
  });
});
