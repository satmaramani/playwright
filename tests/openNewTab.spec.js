import { chromium, test, expect } from "@playwright/test";

test("new tab accessing @openNewTab @newtab", async ({ page }) => {
  // Open the initial page
  await page.goto("http://localhost:9090/openPageNewWindow/sourcePage.html");

  // Wait for a new page to be opened
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("button[onclick='openInTab()']"),
  ]);

  // Interact with elements on the new tab page
  await newPage.fill("#textbox", "This is Sam");
  await newPage.click("#submit");

  // Wait for the result to be updated
  await newPage.waitForSelector("#placeholderSpan");

  // Assert the text content of the placeholder span
  await expect(await newPage.locator("#placeholderSpan").innerText()).toBe(
    "This is Sam"
  );

  await page.waitForTimeout(2000);
  // Wait for a new page to be opened
  const [newPage2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("button[onclick='openInTab()']"),
  ]);

  // Interact with elements on the new tab page
  await newPage2.fill("#textbox", "This is Another Text");
  await newPage2.click("#submit");

  // Wait for the result to be updated
  await newPage2.waitForSelector("#placeholderSpan");

  // Assert the text content of the placeholder span
  await expect(await newPage2.locator("#placeholderSpan").innerText()).toBe(
    "This is Another Text"
  );
});
