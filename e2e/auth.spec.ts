import { test, expect } from "@playwright/test";

test.describe("Auth Pages", () => {
  test("login form has required fields", async ({ page }) => {
    await page.goto("/giris");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    // Submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("signup form has name, email, password", async ({ page }) => {
    await page.goto("/kayit-ol");
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("signup name field is required (min 2 chars)", async ({ page }) => {
    await page.goto("/kayit-ol");
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute("required", "");
  });

  test("forgot password page loads", async ({ page }) => {
    await page.goto("/sifremi-unuttum");
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("login page has link to signup", async ({ page }) => {
    await page.goto("/giris");
    const signupLink = page.locator('a[href*="kayit-ol"]');
    await expect(signupLink).toBeVisible();
  });
});
