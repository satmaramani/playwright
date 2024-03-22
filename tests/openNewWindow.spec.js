import { test, expect } from "@playwright/test";

//npx playwright test --project=chromium -g "@openNewWindow" --headed

test("new window handling-when second window resource url is known @openNewWindow @newwindow @writeonconsole", async ({
  context,
}) => {
  // Create window one object
  const pageOne = await context.newPage();
  await pageOne.goto("/openPageNewWindow/sourcePage.html");
  //   await pageOne.locator('button[onclick="openInWindow()"]').click();

  // Start waiting for new page before clicking. Note no await.
  const pagePromise = context.waitForEvent("page");
  await pageOne.locator('button[onclick="openInWindow()"]').click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  await newPage.waitForURL("**/targetPage.html");
  console.log(await newPage.title());
  console.log(" New Page is opened, URL is ", newPage.url());

  // Interact with elements on the new tab page
  await newPage.fill("#textbox", "This is Sam");
  await newPage.click("#submit");

  // Wait for the result to be updated
  await newPage.waitForSelector("#placeholderSpan");

  // Assert the text content of the placeholder span
  await expect(await newPage.locator("#placeholderSpan").innerText()).toBe(
    "This is Sam"
  );

  const pagePromise2 = context.waitForEvent("page");
  await newPage.locator("//a[normalize-space()='Target Page 2']").click();
  const finalPage = await pagePromise2;
  await finalPage.waitForLoadState();
  await finalPage.waitForURL("**/targetPage2.html");

  await finalPage.waitForSelector("h1");

  // Get the heading element using getByRole
  const headingElement = await finalPage.locator(
    "//h1[normalize-space()='This is final target page 2']"
  );

  // Extract the text content from the heading element
  const headingText = await headingElement.textContent();

  // Assert the text content
  expect(headingText).toBe("This is final target page 2");

  // Wait for a new page event at the context level
  const pagePromise3 = context.waitForEvent("page");

  const links = await finalPage.locator('a[alt="repeat alt text"]').all();

  for (const link of links) {
    const url = await link.getAttribute("href");

    await finalPage.evaluate((url) => {
      // Check if the DOM content is loaded before manipulation
      if (document.readyState === "complete") {
        // Create a new <div> element to display the URL
        const div = document.createElement("div");
        div.textContent = `URL of the link: ${url}`;
        // Insert the <div> element at the top of the page
        document.body.prepend(div);
      }
    }, url);

    await link.click();
    await finalPage.waitForURL();
  }
});
