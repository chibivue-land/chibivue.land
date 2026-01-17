// @ts-nocheck - @nuxt/test-utils e2e types are not fully compatible
import { describe, it, expect } from "vitest";
import { setup, $fetch, createPage } from "@nuxt/test-utils/e2e";

describe("Navigation E2E", async () => {
  await setup({
    browser: true,
  });

  it("renders home page", async () => {
    const html = await $fetch("/");
    expect(html).toContain("chibivue.land");
    expect(html).toContain("Welcome to the Kingdom");
  });

  it("renders about page", async () => {
    const html = await $fetch("/about");
    expect(html).toContain("About chibivue.land");
    expect(html).toContain("Our Story");
  });

  it("renders activities page", async () => {
    const html = await $fetch("/activities");
    expect(html).toContain("Activities");
    expect(html).toContain("Featured Projects");
  });

  it("navigates between pages", async () => {
    const page = await createPage("/");

    // Check home page loaded
    await page.waitForSelector("text=chibivue.land");

    // Navigate to About
    await page.click("text=About");
    await page.waitForSelector("text=Our Story");
    expect(page.url()).toContain("/about");

    // Navigate to Activities
    await page.click("text=Activities");
    await page.waitForSelector("text=Featured Projects");
    expect(page.url()).toContain("/activities");

    // Navigate back to Home
    await page.click("text=Home");
    await page.waitForSelector("text=Welcome to the Kingdom");
    expect(page.url()).not.toContain("/about");
    expect(page.url()).not.toContain("/activities");

    await page.close();
  });

  it("switches language", async () => {
    const page = await createPage("/");

    // Find and click language switch
    const langButton = page.locator('button[aria-label*="language"]');
    await langButton.click();

    // Wait for Japanese content
    await page.waitForSelector("text=日本語");

    await page.close();
  });
});
