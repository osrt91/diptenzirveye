import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage → /giris navigates correctly", async ({ page }) => {
    await page.goto("/giris");
    await expect(page).toHaveURL(/giris/);
    // Login form should have email input
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("homepage → /kayit-ol navigates correctly", async ({ page }) => {
    await page.goto("/kayit-ol");
    await expect(page).toHaveURL(/kayit-ol/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("/login redirects to /giris", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/giris/);
  });

  test("/signup redirects to /kayit-ol", async ({ page }) => {
    await page.goto("/signup");
    await expect(page).toHaveURL(/kayit-ol/);
  });

  test("/fiyatlar loads pricing page", async ({ page }) => {
    await page.goto("/fiyatlar");
    await expect(page).toHaveURL(/fiyatlar/);
    // Page should have pricing-related heading
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("/blog loads blog page", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveURL(/blog/);
  });

  test("/iletisim loads contact page", async ({ page }) => {
    await page.goto("/iletisim");
    await expect(page).toHaveURL(/iletisim/);
  });
});
