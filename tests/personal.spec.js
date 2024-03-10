const { test, expect } = require("@playwright/test");

test("Go to URL", async ({ page }) => {
  await page.goto("http://localhost:9090/index.html");
  await page.locator("//a[normalize-space()='Forms - Personal']").click();
});

test("Fill the form and submit @form @submit", async ({ page }) => {
  const firstname = "Sampurna";
  const lastname = "Atmaramani";
  const genderOption = "female";
  const companyNameEnter = "Synechron Automation Team";
  const ageSelect = "31to40";
  const desc = "I am full stack Developer and Test Automation Engineer";
  const city = "Mumbai";

  await page.goto("http://localhost:9090/forms/person.html");

  await page.locator("#firstName").fill(firstname);
  await page.locator("#lastName").fill(lastname);
  await page.locator("#gender").selectOption(genderOption);
  await page.getByPlaceholder("Company Name").fill(companyNameEnter);
  await page.locator("#ageGroup").selectOption(ageSelect);

  await page.getByPlaceholder("Description").fill(desc);
  await page.locator("#pizza").check();
  await page.locator("#pasta").check();
  await page.locator("#mumbai").click();
  await page.locator(".submit-button").click();
  // Expect a title "to contain" a substring.
  await expect(await page.locator("#outputFirstname").textContent()).toContain(
    firstname
  );
  await expect(await page.locator("#outputLastname").textContent()).toContain(
    lastname
  );
  await expect(await page.locator("#outputGender").textContent()).toContain(
    genderOption
  );
  await expect(await page.locator("#outputCompany").textContent()).toContain(
    companyNameEnter
  );
  await expect(await page.locator("#outputAge").textContent()).toContain(
    ageSelect
  );
  await expect(await page.locator("#outputDesc").textContent()).toContain(desc);
  await expect(await page.locator("#outputCity").textContent()).toContain(city);

  const foodPreferences = "Pizza, Pasta";

  // Split the string into an array using comma as the separator
  const foodArray = foodPreferences.split(", ");

  // Assert the existence of "Pizza" and "Pasta" in the array
  const pizzaExists = foodArray.includes("Pizza");
  const pastaExists = foodArray.includes("Pasta");

  await expect(foodPreferences).toContain(
    await page.locator("#outputFood").textContent()
  );
});
