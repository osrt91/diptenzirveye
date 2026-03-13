import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Dipten\s*Zirveye/i);
    // Hero heading should be visible
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("navbar is visible with logo", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("book roadmap section renders", async ({ page }) => {
    await page.goto("/");
    const mufredat = page.locator("#mufredat");
    await expect(mufredat).toBeAttached();
  });

  test("leaderboard section renders", async ({ page }) => {
    await page.goto("/");
    // Leaderboard block should show demo or real users
    const leaderboard = page.getByText(/Liderlik Tablosu|Sıralama/i).first();
    await expect(leaderboard).toBeVisible();
  });

  test("CTA buttons link to /giris", async ({ page }) => {
    await page.goto("/");
    const ctaLinks = page.locator('a[href="/giris"]');
    expect(await ctaLinks.count()).toBeGreaterThan(0);
  });
});
