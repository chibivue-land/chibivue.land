import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/lighthouse/**/*.test.ts"],
    testTimeout: 180000,
    hookTimeout: 120000,
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
});
