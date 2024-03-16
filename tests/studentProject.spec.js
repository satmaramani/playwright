const { test, expect } = require("@playwright/test");

test.beforeEach("Before Each", async ({ page }) => {});

async function getActualRowsCount(page, counter = 0) {
  await page.waitForLoadState();

  // Increment the counter by the number of rows on the current page
  counter += await page.$$eval("table tbody tr", (rows) => rows.length);

  console.log("Current Counter value:", counter);

  // Check if the "Next" button is enabled
  const isNextPageEnabled = await page.locator("#nextPage").isEnabled();

  console.log("Next page enabled status:", isNextPageEnabled);

  if (isNextPageEnabled) {
    // Click on the "Next" button
    await page.locator("#nextPage").click();

    // Recursively call the function with the updated counter
    return getActualRowsCount(page, counter);
  }

  // If the "Next" button is disabled, return the final counter value
  console.log("Final Counter value:", counter);
  return counter;
}

async function addStudentData(page) {
  const jsonObject = [
    { student: "studentName", subject: "Subject1", marks: "1" },
    // { student: "studentName2", subject: "Subject2", marks: "2" },
    // { student: "studentName3", subject: "Subject3", marks: "3" },
    // { student: "studentName4", subject: "Subject4", marks: "4" },
    // { student: "studentName5", subject: "Subject5", marks: "5" },
    // { student: "studentName6", subject: "Subject6", marks: "6" },
    // { student: "studentName7", subject: "Subject7", marks: "7" },
    // { student: "studentName8", subject: "Subject8", marks: "8" },
    // { student: "studentName9", subject: "Subject9", marks: "9" },
    // { student: "studentName", subject: "Subject1", marks: "1" },
    // { student: "studentName2", subject: "Subject2", marks: "2" },
    // { student: "studentName3", subject: "Subject3", marks: "3" },
    // { student: "studentName4", subject: "Subject4", marks: "4" },
    // { student: "studentName5", subject: "Subject5", marks: "5" },
    // { student: "studentName6", subject: "Subject6", marks: "6" },
    // { student: "studentName7", subject: "Subject7", marks: "7" },
    // { student: "studentName8", subject: "Subject8", marks: "8" },
    // { student: "studentName9", subject: "Subject9", marks: "9" },
    { student: "sampurna", subject: "Subject9", marks: "9" },
    { student: "samarth", subject: "Subject9", marks: "9" },
    { student: "sampark", subject: "Subject9", marks: "9" },
  ];

  for (let i = 0; i < jsonObject.length; i++) {
    await page.locator("#studentName").fill(jsonObject[i]["student"]);
    await page.locator("#subject").fill(jsonObject[i]["subject"]);
    await page.fill("#marks", jsonObject[i]["marks"]);

    await page.locator("//button[@type='submit']").click();
  }
  return jsonObject;
}

async function goToFirstPageList(page) {
  await page.waitForTimeout(1000);
  const PrevPaginationIsEnabled = await page.locator("#prevPage").isEnabled();

  if (PrevPaginationIsEnabled) {
    await page.waitForTimeout(1000);
    await page.locator("#prevPage").click();
    await page.waitForLoadState();
    await goToFirstPageList(page);
  }
  return true;
}
test(" Student Addition @studentAdd @student", async ({ page }) => {
  await test.step("Go to Page and Click on Student Project", async () => {
    await page.goto("http://localhost:9090/index.html");
    await page.getByText("Student Project").click();
    await page.waitForURL("**/studentTable/index.html");
  });

  const jsonObject = await addStudentData(page);

  //below function will return the row counter
  var finalRowCountPre = await getActualRowsCount(page, 0);

  await page.waitForTimeout(1000);
  await expect(finalRowCountPre).toBe(jsonObject.length);
  await goToFirstPageList(page);

  const firstSTudentRow = await page.locator("table tbody tr").first();
  await page.waitForTimeout(1000);
  await firstSTudentRow.getByText("Remove").click();

  await page.waitForTimeout(3000);

  const finalRowCountPostRemoval = await getActualRowsCount(page, 0);
  await expect(finalRowCountPostRemoval).toBe(jsonObject.length - 1);
  await page.waitForTimeout(1000);

  await page.locator("#searchInput").fill("sam");
  await page.waitForTimeout(1000);
  const finalRowCountPostSearch = await getActualRowsCount(page, 0);
  console.log("This is search result count ", finalRowCountPostSearch);
  expect(finalRowCountPostSearch).toBe(3);

  await page.getByText("Reset").click();
  const finalRowCountPostReset = await getActualRowsCount(page, 0);
  expect(finalRowCountPostReset).toBe(finalRowCountPostRemoval);

  page.on("dialog", async (dialogBox) => {
    setTimeout(() => dialogBox.accept(), 5000);
  });

  await page.waitForTimeout(3000);
  await page.locator("(//button[contains(text(),'Details')])[1]").click();
  await page.waitForTimeout(3000);
  await page.locator("(//button[contains(text(),'Details')])[2]").click();
});