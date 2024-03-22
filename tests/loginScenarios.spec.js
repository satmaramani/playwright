const { test, expect } = require("@playwright/test");

test.describe("Login Page @login", () => {
  let page;

  test.beforeEach(async ({ page }) => {
    await page.goto("/loginScenario/login.html"); // Replace with your local server URL
  });

  test("Correct login", async ({ page, context }) => {
    await page.fill("#username", "user1");
    await page.fill("#password", "password1");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("/loginScenario/profile.html");
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();

    // Store token in context to use in subsequent requests
    context.token = token;
  });

  test("Wrong Credentials", async ({ page, context }) => {
    await page.fill("#username", "user1234");
    await page.fill("#password", "password1");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("/loginScenario/login.html");
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeNull();

    // Store token in context to use in subsequent requests
    context.token = token;
  });

  test("Restricted page access with valid token", async ({ page, context }) => {
    const token = context.token;
    const response = await page.goto("http://localhost:9091/restricted1", {
      headers: {
        Authorization: `Bearer ${token}`, // Correctly prefix the token with 'Bearer '
      },
      waitUntil: "domcontentloaded", // Wait for the response to be received
    });

    // Parse the JSON response
    const responseBody = await response.json();

    // Check if the response contains the error message when token is not provided
    if (responseBody.error === "Token not provided") {
      expect(responseBody.error).toBe("Token not provided");
    } else {
      // If token is provided, expect to see the welcome message
      expect(responseBody.message).toContain(
        "Welcome to the restricted endpoint 1!"
      );
    }
  });

  test("Restricted page access without token", async ({ page }) => {
    const response = await page.goto("http://localhost:9091/restricted1");

    // Parse the JSON response
    const responseBody = await response.json();

    // Check if the response contains the error message when token is not provided
    expect(responseBody.error).toBe("Token not provided");
  });

  test("Restricted page access with token using fetch method @loginApi", async ({
    page,
    context,
  }) => {
    const token = context.token;

    const response = await page.evaluate(async (token) => {
      const url = "http://localhost:9091/restricted1";
      const response = await fetch(url, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.json();
    }, token);

    console.log(token);
    // Check if the response contains the expected error message when token is not provided
    expect(response.error).toMatch(/Token not provided|Invalid token/);
  });
});
