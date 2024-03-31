const { test, chromium, expect } = require("@playwright/test");
const fs = require("fs/promises");

test("Re login using storage State and validate @storageState2", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Load storage state from file
  const storageStateData = JSON.parse(
    await fs.readFile("storageState.json", "utf-8")
  );
  await context.addCookies(storageStateData.cookies);

  // Navigate to restricted endpoint
  const page = await context.newPage();
  const response = await fetch("http://localhost:9091/restricted1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${storageStateData.cookies[0].value}`,
    },
  }).then((response) => response.json());

  console.log("Token Value is => ", `${storageStateData.cookies[0].value}`);

  // Check if the response contains a token or error message
  if ("message" in response) {
    // Successful login
    console.log("Error:", response.error);

    expect(response.message).toBe("Welcome to the restricted endpoint 1!");
  } else {
    expect(response.error).not.toBe("Invalid token");
    console.log(response);
  }

  //save complete information on storage.json file so that you can reuse in other browser context
  await context.storageState({ path: "storage30032024.json" });
  // Perform actions on the restricted page, such as verifying authentication

  await browser.close();
});
