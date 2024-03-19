const { MainPage } = require("./mainPage");

const { test, expect } = require("@playwright/test");

test.beforeEach("Before each", async ({ page, browser }, testInfo) => {
  const MainPageObject = new MainPage(page);
  const googleObj = MainPageObject.getGoogleObject();
  const calculationObj = MainPageObject.getCalculationObject();

  // Initialize testInfo.data if it's undefined
  if (!testInfo.data) {
    testInfo.data = {};
  }

  testInfo.data.MainPageObject = MainPageObject;
  testInfo.data.googleObj = googleObj;
  testInfo.data.calculationObj = calculationObj;
});

test("Multiple Locations Google map @googleMap @pizzaSearch @mainPom @recordvideo", async ({
  browser,
  page,
}, testInfo) => {
  const { MainPageObject, googleObj, calculationObj } = testInfo.data;
  // Create a new browser context with geolocation set to Afghanistan

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const FinalDate = `${year}-${month}-${day}`;

  const contextAfghanistan = await browser.newContext({
    geolocation: googleObj.geolocation,
    recordVideo: { dir: `./videos/${FinalDate}/` },
  });

  const pageAfghanistan = await contextAfghanistan.newPage();
  // Create a new page in the Afghanistan context

  await pageAfghanistan.goto(googleObj.url);

  // Wait for the map to load
  await pageAfghanistan.waitForSelector(googleObj.checkboxSelector); // Wait for the search input field to load
  await pageAfghanistan.fill(
    googleObj.checkboxSelector,
    googleObj.searchString
  ); // Fill the search input with "Pizza Nearby"

  await pageAfghanistan.waitForLoadState();
  await pageAfghanistan.waitForTimeout(3000);

  // Click on the search button
  await pageAfghanistan.click(googleObj.searchButton);

  await pageAfghanistan.waitForLoadState(); // Wait for the search results to load

  // Close the page and context for Afghanistan
  await pageAfghanistan.close();
  await contextAfghanistan.close();
});

test("Addition - Page using Main Class @mainPom @mainPomClass ", async ({
  page,
}, testInfo) => {
  const { MainPageObject, googleObj, calculationObj } = testInfo.data;

  //   calculationObj = new calculationObj(page); // Instantiate the CalculationPage class
  await page.goto(calculationObj.url);
  await page.waitForSelector(calculationObj.arithmaticUrlSelector, {
    visible: true,
  });
  await page.click(calculationObj.arithmaticUrlSelector); // Use the correct selector
  await page.waitForLoadState();

  await calculationObj.doAddition("100", "205");
  expect(await calculationObj.outputArea.innerText()).toBe("305");
});

test("subtraction - Page using Main Class @mainPom @mainPomClass @subtraction", async ({
  page,
}, testInfo) => {
  const { MainPageObject, googleObj, calculationObj } = testInfo.data;

  //   calculationObj = new calculationObj(page); // Instantiate the CalculationPage class
  await page.goto(calculationObj.url);
  await page.waitForSelector(calculationObj.arithmaticUrlSelector, {
    visible: true,
  });
  await page.click(calculationObj.arithmaticUrlSelector); // Use the correct selector
  await page.waitForLoadState();

  await calculationObj.doSubtraction("100", "25");
  expect(await calculationObj.outputArea.innerText()).toBe("75");
});
