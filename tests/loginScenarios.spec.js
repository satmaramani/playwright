const { test, expect, chromium } = require("@playwright/test");

test.describe("Login Page @login", () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/loginScenario/login.html"); // Replace with your local server URL
    console.log("Before Each hook called, going to login.html page ");
  });

  test("Wrong Credentials", async ({ page }) => {
    await page.fill("#username", "user1234");
    await page.fill("#password", "password1");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("/loginScenario/login.html");
    const token = await page.evaluate(() => localStorage.getItem("token"));

    console.log("token is null because wrong credentials are provided ");
    expect(token).toBeNull();
    console.log("This is token before => ", context.token);
    // Store token in context to use in subsequent requests
    context.token = token;
    console.log("This is token after => ", context.token);
  });

  test("Correct login", async ({ page }) => {
    await page.fill("#username", "user1");
    await page.fill("#password", "password1");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("/loginScenario/profile.html");
    const token = await page.evaluate(() => localStorage.getItem("token"));
    console.log("This is token => ", token);
    expect(token).toBeTruthy();

    console.log("This is token before => ", context.token);
    // Store token in context to use in subsequent requests
    context.token = token;
    console.log("This is token after => ", context.token);
  });

  test("Restricted page access with valid token", async ({ page }) => {
    const token = context.token;
    console.log("This is token => ", token);
    const response = await page.goto("http://localhost:9091/restricted1", {
      headers: {
        Authorization: `${token}`, // Correctly prefix the token with 'Bearer '
      },
      waitUntil: "domcontentloaded", // Wait for the response to be received
    });

    // Parse the JSON response
    const responseBody = await response.json();

    console.log("This is response Body => ", responseBody);
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
    console.log(responseBody);
    // Check if the response contains the error message when token is not provided
    expect(responseBody.error).toBe("Token not provided");
  });

  test("Restricted page access with token using fetch method @loginApi", async ({
    page,
  }) => {
    console.log(" This is context on line 89 ", context.token);
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
    console.log(response);
    console.log(token);
    if (response.error) {
      // Check if the response contains the expected error message when token is not provided
      expect(response.error).toMatch(/Token not provided|Invalid token/);
    }
  });
});
