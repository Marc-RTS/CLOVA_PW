// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const env = process.env.ENV;
const baseUrl = env ? `https://${env}.clova.riotinto.com` : 'http://localhost:8080';
const headless = process.env.HEADLESS || 'true';
const fullyParallel = process.env.FULLY_PARALLEL || 'true';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './tests',

  // Run all tests in parallel.
  fullyParallel: fullyParallel === 'true',

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: 14, //process.env.CI ? 1 : undefined,

  // Each test is given 30 seconds.
  timeout: 60000,
  expect: { timeout: 30000 },

  // Reporter to use
  reporter: [['html'], ['list'], ['allure-playwright', { detail: true, suiteTitle: true }], ['json', { outputFile: 'test-results/test-results.json' }]],

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: baseUrl,

    //timeout
    actionTimeout: 30 * 1000,
    navigationTimeout: 60 * 1000,

    // Collect trace when retrying the failed test.
    trace: 'on',
    headless: headless === 'true',
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },
    {
      name: 'edge',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },
    {
      name: 'api',
      testDir: './tests/api',
      dependencies: ['setup'],
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */

    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
