// // Set the require hook to use ES modules
// require = require("esm")(module);

// const { chromium } = require("@playwright/test");

// async function run() {
//   const url = "https://www.google.com";

//   // Launch a headless Chromium browser instance with Playwright
//   const browser = await chromium.launch();

//   // Create a new page
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   // Go to the specified URL
//   await page.goto(url);

//   // Get the final URL in case of redirects
//   const finalUrl = page.url();

//   // Dynamically import runLighthouse from Lighthouse
//   const { runLighthouse } = await import("lighthouse/core/index.js");

//   // Run Lighthouse for the final URL

//   const { lhr } = await runLighthouse(finalUrl, {
//     port: 9222,
//     output: "json", // You can change output format to 'html' or 'csv'
//   });

//   // Output the results
//   console.log("Performance score:", lhr.categories.performance.score * 100);
//   console.log("Accessibility score:", lhr.categories.accessibility.score * 100);
//   console.log(
//     "Best practices score:",
//     lhr.categories["best-practices"].score * 100
//   );
//   console.log("SEO score:", lhr.categories.seo.score * 100);
//   console.log("PWA score:", lhr.categories.pwa.score * 100);

//   // Close the browser
//   await browser.close();
// }

// run().catch(console.error);
