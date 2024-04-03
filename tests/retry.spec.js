const { test, expect, describe } = require("@playwright/test");

// Retry the test up to 3 times with a 6-second timeout
test.describe.configure({ retries: 3, timeout: 1000 });

describe("retry @timeout @retriesgroup", () => {
  test("Timeout and Retry Demo @retry @retries @timeout", async () => {
    console.log("Starting the test...");

    // Simulate a condition that causes failure within the timeout period
    // For example, asserting false
    // expect(true).toBeFalsy();

    // This line will not be reached due to the failure above
    console.log("Test completed successfully!");
  });

  test("2nd Timeout and Retry Demo @retry @retries @timeout", async () => {
    console.log("Starting the test...");

    // Simulate a condition that causes failure within the timeout period
    // For example, asserting false
    // expect(true).toBeFalsy();

    // This line will not be reached due to the failure above
    console.log("Test completed successfully!");
  });
});
