/* eslint-disable no-console */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import lighthouse, { type RunnerResult, type Flags } from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

const THRESHOLDS = {
  performance: 80,
  accessibility: 90,
  "best-practices": 80,
  seo: 80,
};

let serverProcess: ChildProcess | null = null;
let chrome: chromeLauncher.LaunchedChrome | null = null;

function startServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    serverProcess = spawn("bunx", ["serve", ".output/public", "-p", String(PORT)], {
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });

    const timeout = setTimeout(() => {
      reject(new Error("Server start timeout"));
    }, 30000);

    serverProcess.stdout?.on("data", (data: Buffer) => {
      const output = data.toString();
      if (output.includes("Accepting connections") || output.includes("Local:")) {
        clearTimeout(timeout);
        setTimeout(resolve, 1000);
      }
    });

    serverProcess.stderr?.on("data", (data: Buffer) => {
      console.error("Server error:", data.toString());
    });

    serverProcess.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

function stopServer(): void {
  if (serverProcess) {
    serverProcess.kill("SIGTERM");
    serverProcess = null;
  }
}

async function runLighthouse(url: string): Promise<RunnerResult | undefined> {
  if (!chrome) {
    throw new Error("Chrome is not launched");
  }

  const flags: Flags = {
    port: chrome.port,
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    formFactor: "desktop",
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  };

  const result = await lighthouse(url, flags);
  return result;
}

function getScore(result: RunnerResult | undefined, category: string): number {
  if (!result?.lhr?.categories) return 0;
  const cat = result.lhr.categories[category];
  if (!cat || typeof cat.score !== "number") return 0;
  return Math.round(cat.score * 100);
}

describe("Lighthouse Performance Tests", () => {
  beforeAll(async () => {
    await startServer();

    chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless", "--disable-gpu", "--no-sandbox"],
    });
  }, 60000);

  afterAll(async () => {
    if (chrome) {
      await chrome.kill();
      chrome = null;
    }
    stopServer();
  });

  it("home page meets performance thresholds", async () => {
    const result = await runLighthouse(`${BASE_URL}/`);

    const scores = {
      performance: getScore(result, "performance"),
      accessibility: getScore(result, "accessibility"),
      "best-practices": getScore(result, "best-practices"),
      seo: getScore(result, "seo"),
    };

    console.log("Home page Lighthouse scores:", scores);

    expect(scores.performance).toBeGreaterThanOrEqual(THRESHOLDS.performance);
    expect(scores.accessibility).toBeGreaterThanOrEqual(THRESHOLDS.accessibility);
    expect(scores["best-practices"]).toBeGreaterThanOrEqual(THRESHOLDS["best-practices"]);
    expect(scores.seo).toBeGreaterThanOrEqual(THRESHOLDS.seo);
  }, 120000);

  it("about page meets performance thresholds", async () => {
    const result = await runLighthouse(`${BASE_URL}/about`);

    const scores = {
      performance: getScore(result, "performance"),
      accessibility: getScore(result, "accessibility"),
      "best-practices": getScore(result, "best-practices"),
      seo: getScore(result, "seo"),
    };

    console.log("About page Lighthouse scores:", scores);

    expect(scores.performance).toBeGreaterThanOrEqual(THRESHOLDS.performance);
    expect(scores.accessibility).toBeGreaterThanOrEqual(THRESHOLDS.accessibility);
    expect(scores["best-practices"]).toBeGreaterThanOrEqual(THRESHOLDS["best-practices"]);
    expect(scores.seo).toBeGreaterThanOrEqual(THRESHOLDS.seo);
  }, 120000);

  it("activities page meets performance thresholds", async () => {
    const result = await runLighthouse(`${BASE_URL}/activities`);

    const scores = {
      performance: getScore(result, "performance"),
      accessibility: getScore(result, "accessibility"),
      "best-practices": getScore(result, "best-practices"),
      seo: getScore(result, "seo"),
    };

    console.log("Activities page Lighthouse scores:", scores);

    expect(scores.performance).toBeGreaterThanOrEqual(THRESHOLDS.performance);
    expect(scores.accessibility).toBeGreaterThanOrEqual(THRESHOLDS.accessibility);
    expect(scores["best-practices"]).toBeGreaterThanOrEqual(THRESHOLDS["best-practices"]);
    expect(scores.seo).toBeGreaterThanOrEqual(THRESHOLDS.seo);
  }, 120000);

  it("community page meets performance thresholds", async () => {
    const result = await runLighthouse(`${BASE_URL}/community`);

    const scores = {
      performance: getScore(result, "performance"),
      accessibility: getScore(result, "accessibility"),
      "best-practices": getScore(result, "best-practices"),
      seo: getScore(result, "seo"),
    };

    console.log("Community page Lighthouse scores:", scores);

    expect(scores.performance).toBeGreaterThanOrEqual(THRESHOLDS.performance);
    expect(scores.accessibility).toBeGreaterThanOrEqual(THRESHOLDS.accessibility);
    expect(scores["best-practices"]).toBeGreaterThanOrEqual(THRESHOLDS["best-practices"]);
    expect(scores.seo).toBeGreaterThanOrEqual(THRESHOLDS.seo);
  }, 120000);
});
