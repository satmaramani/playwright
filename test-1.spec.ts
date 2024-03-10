import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Search', { exact: true }).fill('sam atmaramani');
  await page.getByRole('link', { name: 'Sam Atmaramani - Senior Solutions Architect - AWS Cloud ... LinkedIn · Sam' }).click();
});