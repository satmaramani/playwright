import { myTest } from "./fixturesImplementation.ts";

myTest(
  "Your custom Playwright setup @fixtures ",
  async ({ testUser, loggedInPage }) => {
    console.log("this is testUser name ", testUser.name);
    // console.log("this is loggedInPage ", loggedInPage);
    // loggedInPage();
  }
);

myTest("only one param @fixtures", async ({ testUser }) => {
  console.log(" I am borrowing only one fixture ", testUser);
});

myTest("samVar @fixtures", async ({ samVar }) => {
  console.log(" I am borrowing only samVar ", samVar);
});

myTest("Another example of Fixtures @fixtures", async () => {
  console.log(" I am not borrowing any fixtures");
});
