import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.js", "**/src/**/*.test.ts", "**/src/**/*.spec.js", "**/src/**/*.spec.ts"],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};

export default config;
