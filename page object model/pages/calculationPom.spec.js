const { CalculationPage } = require("./calculationPage.js");
const { test, expect, describe } = require("@playwright/test");

describe("Calculations using POM Method @pom @describe", async () => {
  let calculationObj;

  test.beforeEach(async ({ page }) => {
    calculationObj = new CalculationPage(page); // Instantiate the CalculationPage class
    await page.goto(calculationObj.url);
    await page.waitForSelector(calculationObj.arithmaticUrlSelector, {
      visible: true,
    });
    await page.click(calculationObj.arithmaticUrlSelector); // Use the correct selector
    await page.waitForLoadState();
  });

  test("addition using POM @additionpom", async ({ page }) => {
    await calculationObj.num1Locator.fill("20");
    await calculationObj.num2Locator.fill("5");
    await calculationObj.addButton.click();
    await page.waitForSelector(calculationObj.outputId);
    expect(await calculationObj.outputArea.innerText()).toBe("25");
  });

  test("Subtraction using POP @subtractpom ", async ({ page }) => {
    await calculationObj.num1Locator.fill("20");
    await calculationObj.num2Locator.fill("5");
    await calculationObj.subtractButton.click();
    await page.waitForSelector(calculationObj.outputId);
    expect(await calculationObj.outputArea.innerText()).toBe("15");
  });

  test("Multiplication using POM @subtractionpom", async ({ page }) => {
    await calculationObj.num1Locator.fill("20");
    await calculationObj.num2Locator.fill("5");
    await calculationObj.multiplyButton.click();
    await page.waitForSelector(calculationObj.outputId);
    expect(await calculationObj.outputArea.innerText()).toBe("100");
  });

  test("Division using POM @divisionpom @dividepom", async ({ page }) => {
    await calculationObj.num1Locator.fill("20");
    await calculationObj.num2Locator.fill("5");
    await calculationObj.divideButton.click();
    await page.waitForSelector(calculationObj.outputId);
    expect(await calculationObj.outputArea.innerText()).toBe("4");
  });

  test("addition using  Function POM @additionpomFunction", async ({
    page,
  }) => {
    await calculationObj.doAddition("10", "20");
    expect(await calculationObj.outputArea.innerText()).toBe("30");
  });
  test("Subtract using  Function POM @subtractionpomFunction", async ({
    page,
  }) => {
    await calculationObj.doSubtraction("20", "10");
    expect(await calculationObj.outputArea.innerText()).toBe("10");
  });
  test("Multiplication using Function POM @multiplypomFunction", async ({
    page,
  }) => {
    await calculationObj.doMultiplication("5", "4");
    expect(await calculationObj.outputArea.innerText()).toBe("20");
  });
  test("division using  Function POM @divisionpomFunction", async ({
    page,
  }) => {
    await calculationObj.doDivision("100", "10");
    expect(await calculationObj.outputArea.innerText()).toBe("10");
  });
});
