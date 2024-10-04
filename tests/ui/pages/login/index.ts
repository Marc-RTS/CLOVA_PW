import { Page, chromium, webkit } from '@playwright/test';
import BasePage from '../base.page';
import playwrightConfig from '../../../../playwright.config';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = playwrightConfig.use?.baseURL || 'http://localhost:8080';

export default class LoginPage extends BasePage {
  private name: string;

  constructor(page: Page) {
    super(page);
  }

  async init(): Promise<this> {
    return this;
  }

  setUser(name: string) {
    this.name = name;
  }

  async loginToActiveDirectory(username: string, page: Page) {
    const password = username === 'SERVICE_ACCOUNT_STD' ? process.env.PASSWORD : process.env[`${username}`];
    if (password === undefined) {
      throw new Error(`The password for user ${username} cannot be found. \n
        Please encure ${username}=<password> has been set in .env file if running locally`);
    }

    await page.goto(baseUrl);
    await page.waitForLoadState();
    if (process.env.VPNACCESS) {
      await page.getByRole('link', { name: 'Cancel' }).click();
      await page.waitForURL('**/login.microsoftonline.com/**');
      await page.getByAltText('Organization banner logo').waitFor({ state: 'visible' });
      await page.getByPlaceholder('someone@example.com').fill(`${username}@riotinto.com`);
      await page.getByRole('button', { name: 'Next' }).click();

      await page.waitForLoadState();
      await page.getByPlaceholder('Password').fill(password);
      await page.getByRole('button', { name: 'Sign in' }).click();
      await page.waitForLoadState();
    }

    await page.waitForSelector('data-testid=home-link');
    await page.getByText('Clova').isVisible();
    return page;
  }
}
