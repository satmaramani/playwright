import { test, expect } from "@playwright/test";

test("Assert Element Presence, Visibility, and Text Content @isvisible", async ({
  page,
}) => {
  // Navigate to a sample website
  await page.goto("https://example.com");

  // Assert element presence
  const headerElement = await page.waitForSelector("h1");
  expect(headerElement).not.toBeNull();

  // Assert element visibility
  const visibleElement = await page.isVisible("h1");
  expect(visibleElement).toBeTruthy();

  // Assert text content
  const headerTextContent = await page.textContent("h1");
  expect(headerTextContent).toContain("Example Domain");
});
