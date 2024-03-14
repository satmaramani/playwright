import { test, expect } from '@playwright/test';

test('Google Search Test', async ({ page }) => {
  // Navigate to Google
  await page.goto('https://www.google.com');

  // Wait for 10 seconds
  await page.waitForTimeout(10000);
});
