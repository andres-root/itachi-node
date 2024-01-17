import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.js", "**/src/**/*.test.ts", "**/src/**/*.spec.js", "**/src/**/*.spec.ts"],
};

export default config;
