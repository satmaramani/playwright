export class CalculationPage {
  constructor(page) {
    this.page = page;
    this.num1Locator = this.page.locator("#num1");
    this.num2Locator = this.page.locator("#num2");
    this.addButton = page.locator(".add");
    this.outputId = "#output";
    this.outputArea = page.locator(this.outputId);
    this.subtractButton = page.locator(".subtract");
    this.multiplyButton = page.locator(".multiply");
    this.divideButton = page.locator(".divide");
    this.url = "https://playwright-sam.s3.ap-south-1.amazonaws.com/index.html";
    this.arithmaticUrlSelector =
      'a:has-text("Arithmetic Operations")[href="https://playwright-sam.s3.ap-south-1.amazonaws.com/calculation/operations.html"]';
  }

  async doAddition(num1, num2) {
    await this.num1Locator.fill(num1);
    await this.num2Locator.fill(num2);
    await this.addButton.click();
  }

  async doSubtraction(num1, num2) {
    await this.num1Locator.fill(num1);
    await this.num2Locator.fill(num2);
    await this.subtractButton.click();
  }

  async doMultiplication(num1, num2) {
    await this.num1Locator.fill(num1);
    await this.num2Locator.fill(num2);
    await this.multiplyButton.click();
  }

  async doDivision(num1, num2) {
    await this.num1Locator.fill(num1);
    await this.num2Locator.fill(num2);
    await this.divideButton.click();
  }
}
