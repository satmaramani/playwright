const { test, expect } = require("@playwright/test");

test("All HTML Elements verification @someTag", async ({ page }) => {
  await page.goto("http://localhost:9090/htmlElements/all.html");

  await page.waitForLoadState();

  await expect(
    page.locator("//h1[normalize-space()='Welcome to Playwright Demo']")
  ).toBeVisible();

  await expect(
    page.locator("//p[normalize-space()='This is a paragraph element.']")
  ).toBeEnabled();

  await expect(page.getByText("Link to Example")).toBeAttached();

  await expect(page.getByText("Link to Example")).toHaveAttribute("href");

  await page.getByText("Link to Example").click();

  await expect(await page.url()).toBe("https://www.example.com/");

  await page.goBack();
  await page.waitForLoadState();

  await expect(await page.url()).toBe(
    "http://localhost:9090/htmlElements/all.html"
  );

  await page.locator("#username").fill("TechySam");
  await page.locator("#password").fill("password123");

  await page.waitForTimeout(200);
  page.on("dialog", async (dialog) => {
    await page.waitForTimeout(2000);
    dialog.accept();
  });
  await page.waitForTimeout(200);
  await page.locator("#submitBtn").click();

  await page.getByRole("checkbox").first().check();
  await page.getByRole("checkbox").nth(3).check();

  await page.getByRole("radio").last().check();

  await page.locator("#dropdown").selectOption("Option 3");

  await page.waitForTimeout(200);
  await page.selectOption("#select-demo1", {
    label: "Tuesday",
  });

  await page.waitForTimeout(200);
  await page.selectOption("#select-demo2", {
    value: "4",
  });

  await page.waitForTimeout(200);
  await page.selectOption("#select-demo3", {
    index: 5,
  });

  await page.locator("#textarea").innerText("This should go into textarea");

  await expect(await page.getByAltText("Placeholder Image")).toHaveAttribute(
    "src",
    "https://via.placeholder.com/150"
  );

  await page.waitForTimeout(1000);

  page.evaluate(() => {
    document.getElementById("imageId").height = 150;
    document.getElementById("imageId").width = 150;
    document.getElementById("imageId").src =
      "http://localhost:9090/images/sam.jpg";
  });

  await page.fill("#textarea", "New text content");

  await page.waitForTimeout(1000);

  await expect(await page.getByAltText("Placeholder Image")).toHaveAttribute(
    "src",
    "http://localhost:9090/images/sam.jpg"
  );

  await page.locator("//td[normalize-space()='Row 1, Cell 1']").selectText();

  //   const countTableHead = await page.locator("table tbody tr th").count();
  //   const allTableHead = await page.locator("table tbody tr th").all();

  //   for (let i = 0; i < countTableHead.count(); i++) {
  //     await page.waitForTimeout(1000);
  //     allTableHead[i].selectText();
  //   }
  //   const todos = await page.$$('#todos-list tbody tr');
  // for await (const todo of todos) {
  //   console.log(await todo.innerText());
  //   await todo.click();
  //   await page.click('#remove-todo-button');
  // }

  await page.waitForTimeout(3000);
});
