const { test, chromium } = require("@playwright/test");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");

//npx playwright test --project=chromium -g "@storageStateLogin"
async function getResponse() {
  const response = await fetch("http://localhost:9091/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "user1", password: "password1" }),
  });

  console.log(" I am inside this evaluate block ");
  // Wait for the response to finish
  return await response.json();
}
test("Session Storage Login @storageStateLogin", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Send POST request to login endpoint using page.evaluate

  const response = await getResponse();
  console.log(" This is response received from URL ", response);
  console.log(" This is response received from URL ", response.token);

  const decodedToken = jwt.decode(response.token);

  if (response.token) {
    const tokenCookie = {
      name: "token",
      value: response.token,
      domain: "HttpOnly", // Set domain if available
      path: "/", // Set path if available
      // Add other properties as needed
    };

    // Save token cookie to a file
    await fs.writeFile(
      "storageState.json",
      JSON.stringify({ cookies: [tokenCookie] })
    );
    console.log("Token saved successfully.");
  } else {
    console.error("Token cookie not found.");
  }

  await browser.close();
});

test("Re login using storage State and validate @storageState", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Load storage state from file
  const storageStateData = JSON.parse(
    await fs.readFile("storageState.json", "utf-8")
  );
  await context.addCookies(storageStateData.cookies);

  // Navigate to restricted endpoint
  const page = await context.newPage();
  await page.goto("http://localhost:9091/restricted1");

  await browser.close();
});
