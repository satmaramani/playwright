const { test, expect } = require("@playwright/test");
test("No interception and No Modify Request", async ({ page }) => {
  // Make the API request using Fetch API
  const response = await page.evaluate(async () => {
    const response = await fetch("https://reqres.in/api/users/3");
    return response.json();
  });

  console.log(" This is the response => ", response);

  // Assert that the response contains the modified data
  //   expect(response.data.id).toBe(4);
});

test("Interception and No Modify Request param @requestmock @requestmocking", async ({
  page,
}) => {
  // Intercept requests to specific URL pattern
  await page.route("**/api/users/3", (route) => {
    const newUrl = route.request().url().replace("users/3", "users/5"); // Modify URL
    route.continue({ url: newUrl }); // Continue with modified URL
  });

  // Make the API request using Fetch API
  const response = await page.evaluate(async () => {
    const response = await fetch("https://reqres.in/api/users/3");
    return response.json();
  });

  console.log(" This is the response => ", response);

  // Assert that the response contains the modified data
  //   expect(response.data.id).toBe(4);
});
