// @ts-nocheck - @nuxt/test-utils e2e types are not fully compatible
import { describe, it, expect } from "vitest";
import { setup, $fetch, createPage } from "@nuxt/test-utils/e2e";

describe("Accessibility E2E", async () => {
  await setup({
    browser: true,
  });

  it("home page has proper heading structure", async () => {
    const html = await $fetch("/");

    // Should have exactly one h1
    const h1Matches = (html as string).match(/<h1[^>]*>/g) ?? [];
    expect(h1Matches.length).toBe(1);

    // h1 should contain meaningful content
    expect(html).toMatch(/<h1[^>]*>.*chibivue.*<\/h1>/is);
  });

  it("all images have alt attributes", async () => {
    const html = await $fetch("/");

    // Find all img tags
    const imgTags = (html as string).match(/<img[^>]*>/g) ?? [];

    for (const img of imgTags) {
      // Each img should have an alt attribute
      expect(img).toMatch(/alt=["'][^"']*["']/i);
    }
  });

  it("navigation links are accessible", async () => {
    const page = await createPage("/");

    // Check that navigation exists
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Check that links have accessible text
    const links = await page.locator("nav a").all();
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      const text = await link.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }

    await page.close();
  });

  it("buttons have accessible labels", async () => {
    const page = await createPage("/");

    const buttons = await page.locator("button").all();

    for (const button of buttons) {
      const ariaLabel = await button.getAttribute("aria-label");
      const text = await button.textContent();
      const hasAccessibleName =
        (ariaLabel !== null && ariaLabel.length > 0) || (text !== null && text.trim().length > 0);
      expect(hasAccessibleName).toBe(true);
    }

    await page.close();
  });

  it("interactive elements are keyboard accessible", async () => {
    const page = await createPage("/");

    // Tab through the page and check focusable elements
    await page.keyboard.press("Tab");
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);

    // First focusable element should be a link or button
    expect(["A", "BUTTON", "INPUT"]).toContain(firstFocused);

    await page.close();
  });

  it("color mode toggle is accessible", async () => {
    const page = await createPage("/");

    // Find color mode toggle by its aria-label
    const toggle = page.locator('button[aria-label*="mode"]');
    await expect(toggle).toBeVisible();

    // Check it has proper aria attributes
    const ariaLabel = await toggle.getAttribute("aria-label");
    expect(ariaLabel).toBeTruthy();

    await page.close();
  });

  it("language switch is accessible", async () => {
    const page = await createPage("/");

    // Find language switch by its aria-label
    const langSwitch = page.locator('button[aria-label*="language"]');
    await expect(langSwitch).toBeVisible();

    // Check it has proper aria attributes
    const ariaLabel = await langSwitch.getAttribute("aria-label");
    expect(ariaLabel).toBeTruthy();

    await page.close();
  });

  it("external links have proper attributes", async () => {
    const html = await $fetch("/");

    // Find all external links (with target="_blank")
    const externalLinks = (html as string).match(/<a[^>]*target=["']_blank["'][^>]*>/g) ?? [];

    for (const link of externalLinks) {
      // Should have rel="noopener noreferrer" for security
      expect(link).toMatch(/rel=["'][^"']*noopener[^"']*["']/i);
    }
  });
});
