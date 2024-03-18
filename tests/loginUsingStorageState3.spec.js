const { test, chromium, expect } = require("@playwright/test");
const fs = require("fs/promises");

test("Actual Context Storage state @loginContextStorageState", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login
  // Login API request
  const response = await page.evaluate(async () => {
    const formData = new FormData();
    formData.append("username", "user1");
    formData.append("password", "password1");

    return await fetch("http://localhost:9091/loginStorageState", {
      method: "POST",
      body: formData,
    });
  });

  // Wait for response to finish
  console.log(" this is response ", response);

  // Save storage state
  const storageState = await context.storageState();

  // Restore storage state in a new context
  const newContext = await browser.newContext();
  await newContext.addCookies(storageState.cookies);
  const newPage = await newContext.newPage();

  // Access restricted API endpoint
  const restrictedResponse = await newPage.evaluate(() => {
    return fetch("http://localhost:9091/restricted", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any necessary headers, such as authorization header with token
      },
    });
  });

  // Get JSON response from restricted endpoint
  const restrictedData = await restrictedResponse.json();
  console.log(restrictedData);
  // Verify authentication
  const isAuthenticated = await newPage.innerText("body");
  console.log(isAuthenticated);

  await browser.close();
});