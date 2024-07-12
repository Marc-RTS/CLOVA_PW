import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class AboutPage extends BasePage {
  readonly aboutHeader: Locator;
  readonly homeLnk: Locator;

  constructor(page: Page) {
    super(page);
    this.aboutHeader = this.page.getByRole('heading');
    this.homeLnk = this.page.getByRole('link', { name: 'Home' });
  }

  async init(): Promise<this> {
    return this;
  }

  async getHeader() {
    return await this.aboutHeader.textContent();
  }
  async clickHome() {
    return await this.homeLnk.click();
  }
}
