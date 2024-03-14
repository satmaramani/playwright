const { test, expect, describe } = require("@playwright/test");

// Retry the test up to 3 times with a 5-second timeout
test.describe.configure({ retries: 3, timeout: 1000 });

describe("retry @timeout @retries", () => {
  test("Timeout and Retry Demo @retry @retries @timeout", async () => {
    console.log("Starting the test...");

    // Simulate a delay longer than the test timeout
    await new Promise((resolve) => setTimeout(resolve, 6000));

    // This line will not be reached due to the timeout
    console.log("Test completed successfully!");
  });
});
