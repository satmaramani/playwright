const { test, expect } = require("@playwright/test");

test("Automate Child Windows @childWindows", async ({ page }) => {
  await page.goto("/childWindows/allChildWindows.html");
  // Open Modal
  await page.click('button[onclick="openModal()"]');
  await page.waitForSelector("#myModal");

  // Assert modal content
  const modalContent = await page.textContent(".modal-content");
  expect(modalContent).toContain("This is a modal.");

  // Close Modal
  await page.click(".close");
  await page.waitForSelector("#myModal", { state: "hidden" });

  // Show Notification
  await page.click('button[onclick="showNotification()"]');
  await page.waitForTimeout(3000); // Wait for notification to hide

  // Assert notification content
  const notificationContent = await page.textContent(".notification");
  expect(notificationContent).toContain("This is a notification box.");

  // Open Lightbox
  await page.click('button[onclick="openLightbox()"]');
  await page.waitForSelector("#myLightbox");

  // Close Lightbox
  await page.click("#myLightbox");
  await page.waitForSelector("#myLightbox", { state: "hidden" });

  // Show Dropdown
  await page.click('button[onclick="showDropdown()"]');
  await page.waitForSelector("#myDropdown");

  // Click on Dropdown Option 1
  await page.click('a[href="#"]');
  await page.waitForSelector("#myDropdown", { state: "hidden" });

  // Click on Dropdown Option 2
  await page.click('button[onclick="showDropdown()"]');
  await page.waitForSelector("#myDropdown");
  await page.click('a[href="#"]');
  await page.waitForSelector("#myDropdown", { state: "hidden" });

  // Click on Dropdown Option 3
  await page.click('button[onclick="showDropdown()"]');
  await page.waitForSelector("#myDropdown");
  await page.click('a[href="#"]');
  await page.waitForSelector("#myDropdown", { state: "hidden" });

  // Hover for Tooltip
  await page.hover('button[onmousemove="showTooltip(event)"]');
  await page.waitForSelector("#tooltip");

  // Assert tooltip content
  const tooltipContent = await page.textContent("#tooltip");
  expect(tooltipContent).toContain("This is a tooltip.");

  // Close Tooltip
  await page.hover("body");
  await page.waitForSelector("#tooltip", { state: "hidden" });

  // Show Dialog Box
  await page.click('button[onclick="showDialog()"]');
  await page.waitForSelector("#dialog");

  // Assert dialog content
  const dialogContent = await page.textContent("#dialog");
  expect(dialogContent).toContain("This is a Dialog box by Sam.");

  // Close Dialog Box
  await page.hover('button[onmouseleave="hideDialog(event)"]');
  await page.waitForSelector("#dialog", { state: "hidden" });
});
