import { Page, Locator } from '@playwright/test';
import BasePage from '../../base.page';

export default class Banner extends BasePage {
  readonly clovaBannerLogo: Locator;
  readonly userAvatarBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.clovaBannerLogo = this.page.getByTestId('home-link');
    this.userAvatarBtn = this.page.getByTestId('user-avatar-button');
  }

  async init(): Promise<this> {
    return this;
  }
  async getBanner() {
    return this.clovaBannerLogo;
  }
  async clickUserAvatar() {
    await this.userAvatarBtn.click();
  }
  async clickClovaBannerLogo() {
    await this.clovaBannerLogo.click();
  }
}
