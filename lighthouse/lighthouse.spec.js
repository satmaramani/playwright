// // Set the require hook to use ES modules
// require = require("esm")(module);

// const { chromium } = require("playwright");
// const lighthouse = require("lighthouse");

// async function run() {
//   const url = "https://www.google.com";

//   // Launch a headless Chromium browser instance with Playwright
//   const browser = await chromium.launch();

//   try {
//     // Create a new page
//     const page = await browser.newPage();

//     // Go to the specified URL
//     await page.goto(url);

//     // Get the final URL in case of redirects
//     const finalUrl = page.url();

//     // Run Lighthouse for the final URL
//     const { lhr } = await lighthouse(finalUrl, {
//       port: new URL(browser._browserServer._wsEndpoint).port,
//       output: "json", // You can change output format to 'html' or 'csv'
//       logLevel: "info",
//       onlyCategories: [
//         "performance",
//         "accessibility",
//         "best-practices",
//         "seo",
//         "pwa",
//       ],
//       connection: "playwright",
//     });

//     // Output the results
//     console.log("Performance score:", lhr.categories.performance.score * 100);
//     console.log(
//       "Accessibility score:",
//       lhr.categories.accessibility.score * 100
//     );
//     console.log(
//       "Best practices score:",
//       lhr.categories["best-practices"].score * 100
//     );
//     console.log("SEO score:", lhr.categories.seo.score * 100);
//     console.log("PWA score:", lhr.categories.pwa.score * 100);
//   } catch (error) {
//     console.error("Error running Lighthouse:", error);
//   } finally {
//     // Close the browser
//     await browser.close();
//   }
// }

// run().catch(console.error);
