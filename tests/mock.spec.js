const { test, expect } = require("@playwright/test");

test("API response without mocking @mock", async ({ page }) => {
  // Navigate to a page that automatically triggers the API request
  await page.goto("http://localhost:9090");

  // Wait for the API request to complete
  await page.waitForLoadState("networkidle");

  // Extract the actual response data using page.evaluate
  const actualResponseData = await page.evaluate(() => {
    // Make the API request and return the response data
    return fetch("https://reqres.in/api/users/2")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching data:", error);
        return null;
      });
  });

  console.log("Actual API response without mocking:", actualResponseData);

  // Perform assertions or validations on the actual response data
  // For example, you can check if the response data matches certain criteria
  expect(actualResponseData).not.toBeNull();
});

test("API response with mocking @mock", async ({ page }) => {
  // Define the URL of the API endpoint to mock
  const apiUrl = "https://reqres.in/api/users/2";

  // Define the mocked response data
  const mockedResponse = {
    data: {
      id: 2,
      email: "sam@example.com",
      first_name: "Sam",
      last_name: "Atmaramani",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },
  };

  // Intercept network requests and mock the response for the API URL
  await page.route(apiUrl, (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedResponse),
    });
  });

  // Navigate to a page that automatically triggers the API request
  await page.goto("http://localhost:9090");

  // Wait for the API request to complete
  await page.waitForLoadState("networkidle");

  // Extract the mocked response data using page.evaluate
  const mockedResponseData = await page.evaluate(() => {
    // Make the API request and return the response data
    return fetch("https://reqres.in/api/users/2")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching data:", error);
        return null;
      });
  });

  console.log("Mocked API response:", mockedResponseData);

  // Perform assertions or validations on the mocked response data
  // For example, you can check if the response data matches the mocked data
  expect(mockedResponseData).toEqual(mockedResponse);
});
