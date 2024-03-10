import { test, expect } from "@playwright/test";

test("new window handling-when second window resource url is known @openNewWindow @newwindow", async ({
  context,
}) => {
  // Create window one object
  const pageOne = await context.newPage();
  await pageOne.goto(
    "http://127.0.0.1:5500/public/openPageNewWindow/sourcePage.html"
  );
  //   await pageOne.locator('button[onclick="openInWindow()"]').click();

  // Start waiting for new page before clicking. Note no await.
  const pagePromise = context.waitForEvent("page");
  await pageOne.locator('button[onclick="openInWindow()"]').click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  console.log(await newPage.title());

  // Interact with elements on the new tab page
  await newPage.fill("#textbox", "This is Sam");
  await newPage.click("#submit");

  // Wait for the result to be updated
  await newPage.waitForSelector("#placeholderSpan");

  // Assert the text content of the placeholder span
  await expect(await newPage.locator("#placeholderSpan").innerText()).toBe(
    "This is Sam"
  );
});
