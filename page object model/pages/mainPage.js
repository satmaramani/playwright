import { CalculationPage } from "./calculationPage";
import { GoogleClass } from "./googlePage";

export class MainPage {
  constructor(page) {
    this.page = page;
    this.calculationObject = new CalculationPage(page);
    this.googleObject = new GoogleClass(page);
    this.searchString = "Pizza Nearby";
  }

  getGoogleObject() {
    return this.googleObject;
  }
  getCalculationObject() {
    return this.calculationObject;
  }
}
