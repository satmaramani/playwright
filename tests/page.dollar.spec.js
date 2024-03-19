const { test, expect, chromium } = require("@playwright/test");

test(" Demo of Page.Dollar @page.singledollar ", async ({ page }) => {
  await page.goto("http://localhost:9090/index.html");
  await page.waitForSelector(".dollar");
  const elementHandle = await page.$(".dollar");
  await elementHandle.click();
  await page.waitForTimeout(2000);
});

test(" Demo of Page.Dollar @page.doubledollar1 ", async ({ page }) => {
  await page.goto("http://localhost:9090/index.html");
  await page.waitForSelector(".dollar");
  const elementHandles = await page.$$(".dollar");

  // Check if there is at least one element with the class .dollar
  if (elementHandles.length > 1) {
    // Click on the second element (index 1) in the array
    await elementHandles[1].click();
  } else {
    console.error(
      "No element found with class .dollar or there is only one element."
    );
  }

  await page.waitForLoadState();
});

test(" Demo of Page.Dollar @page.doubledollar2 ", async ({ page }) => {
  await page.goto("http://localhost:9090/index.html");

  await page.waitForLoadState();
  const elementHandles2 = await page.$$(".dollar");

  if (elementHandles2.length > 3) {
    // Click on the second element (index 1) in the array
    await elementHandles2[3].click();
  } else {
    console.error(
      "No element found with class .dollar or there is only one element."
    );
  }
  await page.waitForLoadState();
});

test(" Demo of Page.Dollar @chaining ", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.setContent(
    'First <input type="text" name="username" placeholder="placeholder 1"><br/>Second <input type="text" name="username" placeholder="placeholder 2"><br/>Third <input type="text" name="username" placeholder="placeholder 3"><br/>Last<input type="text" name="username" placeholder="placeholder 4">'
  );
  //   await page.goto("http://localhost:9090/index.html");
  // Locate the first input element and fill it
  const firstInput = page.locator('input[name="username"]').first();
  await firstInput.fill("This is first Element");

  // Locate the last input element and fill it
  const lastInput = page.locator('input[name="username"]').last();
  await lastInput.fill("This is Last Element");

  // Locate the second input element (0-based index) and fill it
  const secondInput = page.locator('input[name="username"]').nth(1);
  await secondInput.fill("This is Second Element");

  //   firstInput.fill("This is first Element");
  //   lastInput.fill("This is Last Element");
  //   secondInput.fill("This is Second Element");

  await page.waitForTimeout(20000);
  // Close the browser
  await browser.close();
});
