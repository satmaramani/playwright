const { test, expect, chromium } = require("@playwright/test");

test("Request and response Interception", async ({ page }) => {
  // Intercept network requests
  await page.route("**/*", (route) => {
    console.log("Intercepted request:", route.request().url());
    route.continue();
  });

  // Intercept network responses
  page.on("response", async (response) => {
    const contentType = response.headers()["content-type"];
    if (contentType && contentType.includes("application/json")) {
      console.log("Intercepted JSON response:", await response.json());
    } else {
      console.log("Intercepted response:", await response.text());
    }
  });

  // Navigate to a URL that triggers an API request
  await page.goto("https://jsonplaceholder.typicode.com/posts/1");
});

test("Console Interception ", async ({ page }) => {
  // Intercept console messages
  page.on("console", (message) => {
    console.log("Console message:", message.text());
  });
  // Navigate to a URL
  await page.goto("https://example.com");
  // Evaluate JavaScript code on the page to trigger console messages
  await page.evaluate(() => {
    console.log("Hello from the page console!");
    console.warn("This is a warning message.");
    console.error("An error occurred on the page.");
  });
});
