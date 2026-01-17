// @ts-nocheck - @nuxt/test-utils e2e types are not fully compatible
import { describe, it, expect } from "vitest";
import { setup, $fetch, createPage } from "@nuxt/test-utils/e2e";

describe("Performance E2E", async () => {
  await setup({
    browser: true,
  });

  it("home page loads within acceptable time", async () => {
    const page = await createPage("/");

    // Measure page load time
    const metrics = await page.evaluate(() => {
      const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.startTime,
        load: timing.loadEventEnd - timing.startTime,
        firstPaint: performance.getEntriesByName("first-paint")[0]?.startTime ?? 0,
        firstContentfulPaint:
          performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0,
      };
    });

    // Assert performance thresholds (in ms)
    // These are generous thresholds for CI environments
    expect(metrics.domContentLoaded).toBeLessThan(5000);
    expect(metrics.load).toBeLessThan(10000);

    if (metrics.firstContentfulPaint > 0) {
      expect(metrics.firstContentfulPaint).toBeLessThan(3000);
    }

    await page.close();
  });

  it("page response size is reasonable", async () => {
    const html = await $fetch("/");

    // Check HTML size (should be reasonably small for SSR)
    const htmlSize = new Blob([html as string]).size;
    const htmlSizeKB = htmlSize / 1024;

    // HTML should be under 200KB (generous threshold)
    expect(htmlSizeKB).toBeLessThan(200);
  });

  it("about page loads within acceptable time", async () => {
    const page = await createPage("/about");

    const metrics = await page.evaluate(() => {
      const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.startTime,
        load: timing.loadEventEnd - timing.startTime,
      };
    });

    expect(metrics.domContentLoaded).toBeLessThan(5000);
    expect(metrics.load).toBeLessThan(10000);

    await page.close();
  });

  it("activities page loads within acceptable time", async () => {
    const page = await createPage("/activities");

    const metrics = await page.evaluate(() => {
      const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.startTime,
        load: timing.loadEventEnd - timing.startTime,
      };
    });

    expect(metrics.domContentLoaded).toBeLessThan(5000);
    expect(metrics.load).toBeLessThan(10000);

    await page.close();
  });

  it("no console errors on page load", async () => {
    const page = await createPage("/");

    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Wait for page to fully load
    await page.waitForLoadState("networkidle");

    // Filter out expected warnings (like Suspense experimental warning)
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("Suspense") && !error.includes("Hydration") && !error.includes("provide()"),
    );

    expect(criticalErrors).toHaveLength(0);

    await page.close();
  });
});
