// const { chromium } = require("@playwright/test");
// const { describe, before, after, it } = require("mocha");

// describe("Example test @mocha ", () => {
//   let browser;

//   before(async () => {
//     // Launch the browser before running the test suite
//     browser = await chromium.launch();
//   });

//   after(async () => {
//     // Close the browser after running all tests in the suite
//     await browser.close();
//   });

//   it("should load example.com", (done) => {
//     // Create a new page and navigate to example.com
//     browser
//       .newPage()
//       .then(async (page) => {
//         await page.goto("https://playwright.dev");

//         await page.locator("//a[@class='getStarted_Sjon']").click();

//         // Close the page
//         await page.close();

//         // Signal the completion of the test case using 'done'
//         done();
//       })
//       .catch((error) => {
//         // If there's an error, fail the test case and log the error
//         done(error);
//       });
//   });
// });
