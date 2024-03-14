const { test, chromium } = require("@playwright/test");

test("Multiple Locations Google map @googleMap @pizzaSearch", async ({
  browser,
}) => {
  // Create a new browser context with geolocation set to Afghanistan
  const contextAfghanistan = await browser.newContext({
    geolocation: { latitude: 33.93911, longitude: 67.709953 }, // Afghanistan coordinates
  });

  // Create a new page in the Afghanistan context
  const pageAfghanistan = await contextAfghanistan.newPage();

  // Navigate to Google Maps
  await pageAfghanistan.goto("https://www.google.com/maps");

  // Wait for the map to load
  await pageAfghanistan.waitForSelector("input#searchboxinput"); // Wait for the search input field to load
  await pageAfghanistan.fill("input#searchboxinput", "Pizza Nearby"); // Fill the search input with "Pizza Nearby"

  await pageAfghanistan.waitForTimeout(2000); // Wait for the search suggestions to appear

  // Click on the search button
  await pageAfghanistan.click("button#searchbox-searchbutton");

  await pageAfghanistan.waitForTimeout(29000); // Wait for the search results to load

  // Close the page and context for Afghanistan
  await pageAfghanistan.close();
  await contextAfghanistan.close();
});
