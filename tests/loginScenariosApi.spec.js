const { test, expect } = require("@playwright/test");

test("Login API Test @loginApiMethodPass", async ({ page }) => {
  // Define the API URL and JSON data
  const apiUrl = "http://localhost:9091/login";
  const jsonData = { username: "user1", password: "password1" };

  // Make a POST request to the login API
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  }).then((response) => response.json());

  // Check if the response contains a token or error message
  if ("token" in response) {
    // Successful login
    console.log("Login successful. Token:", response.token);
    expect(response.token).toBeTruthy();
  }
});

test("Restricted page without token @loginApiMethodRestricted", async ({
  page,
}) => {
  // Define the API URL and JSON data
  const apiUrl = "http://localhost:9091/restricted1";

  // Make a POST request to the login API
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  // Check if the response contains a token or error message
  if ("error" in response) {
    // Successful login
    console.log("Error:", response.error);
    expect(response.error).toBe("Token not provided");
  }
});

test("Restricted page with token @loginApiMethodRestrictedPass", async ({
  page,
}) => {
  const apiUrlLogin = "http://localhost:9091/login";
  const jsonData = { username: "user1", password: "password1" };

  // Make a POST request to the login API
  const responseLogin = await fetch(apiUrlLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  }).then((responseLogin) => responseLogin.json());

  // Check if the response contains a token or error message
  if ("token" in responseLogin) {
    // Successful login
    console.log("Login successful. Token:", responseLogin.token);
    await expect(responseLogin.token).toBeTruthy();

    const actualToken = await responseLogin.token;

    // Define the API URL and JSON data
    const apiUrl = "http://localhost:9091/restricted1";

    // Make a POST request to the login API
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${actualToken}`,
      },
    }).then((response) => response.json());

    // Check if the response contains a token or error message
    if ("message" in response) {
      // Successful login
      console.log("Error:", response.error);
      expect(response.message).toBe("Welcome to the restricted endpoint 1!");
    }
  }
});

test("Restricted page with token @loginApiMethodRestrictedFail", async ({
  page,
}) => {
  const apiUrlLogin = "http://localhost:9091/login";
  const jsonData = { username: "user1", password: "password1" };

  // Make a POST request to the login API
  const responseLogin = await fetch(apiUrlLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  }).then((responseLogin) => responseLogin.json());

  // Check if the response contains a token or error message
  if ("token" in responseLogin) {
    // Successful login
    console.log("Login successful. Token:", responseLogin.token);
    await expect(responseLogin.token).toBeTruthy();

    const actualToken = await responseLogin.token;

    // Define the API URL and JSON data
    const apiUrl = "http://localhost:9091/restricted1";

    // Make a POST request to the login API
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${actualToken}Ganesh`,
      },
    }).then((response) => response.json());

    // Check if the response contains a token or error message
    if ("error" in response) {
      // Successful login
      console.log("Error:", response.error);
      expect(response.error).toMatch(/Token not provided|Invalid token/i);
    }
  }
});

test("Login API Test @loginApiMethodFail", async ({ page }) => {
  // Define the API URL and JSON data
  const apiUrl = "http://localhost:9091/login";
  const jsonData = { username: "user123", password: "password1" };

  // Make a POST request to the login API
  const response = await page.evaluate(
    ({ apiUrl, jsonData }) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      }).then((response) => response.json());
    },
    { apiUrl, jsonData }
  );

  // Check if the response contains a token or error message
  if ("error" in response) {
    // Invalid username or password
    console.error("Login failed:", response.error);
    expect(response.error).toBe("Invalid username or password");
  }
});
