import { expect, test } from "@playwright/test";

export const myTest = test.extend<{
    testUser,
    loggedInPage,
    samVar
   }>({
    samVar: {
      key: "value"
    },
     testUser: {
       name: "Jenny Fish",
     },
     async loggedInPage({ page }, use) {
       await page.goto("https://google.com")
       // more log-in actions before the test
       // ...
   
       // pass the `page` to tests that use `loggedInPage`
       await use(page)
   
       // clean up steps after the test
       // ...
     },
   })