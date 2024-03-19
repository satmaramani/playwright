export class GoogleClass {
  constructor(page) {
    this.page = page;
    this.url = "https://www.google.com/maps";
    this.checkboxSelector = "input#searchboxinput";
    this.searchButton = "button#searchbox-searchbutton";
    this.searchString = "Pizza Nearby";
    this.geolocation = { latitude: 33.93911, longitude: 67.709953 };
  }
}
