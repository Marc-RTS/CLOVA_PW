import { Page, Locator } from '@playwright/test';
import BasePage from '../../base.page';

export default class Poppers extends BasePage {
  readonly userProfile: Locator;
  readonly avatar: Locator;
  readonly fullName: Locator;
  readonly email: Locator;
  readonly jobTitle: Locator;
  readonly cardSignOut: Locator;
  readonly closeIcon: Locator;
  constructor(page: Page) {
    super(page);
    this.userProfile = this.page.getByTestId('user-profile-menu');
    this.avatar = this.page.getByTestId('user-profile-card-avatar-text');
    this.fullName = this.page.getByTestId('user-profile-card-full-name');
    this.email = this.page.getByTestId('user-profile-card-email');
    this.jobTitle = this.page.getByTestId('user-profile-card-jobtitle');
    this.cardSignOut = this.page.getByTestId('user-profile-card-sign-out-button');
    this.closeIcon = this.page.getByTestId('CloseIcon');
  }

  async init(): Promise<this> {
    return this;
  }
  async getUserProfilePopper() {
    return this.userProfile;
  }
  async getUserProfileFullName() {
    return this.fullName;
  }
  async getUserProfileEmail() {
    return this.email;
  }
  async getUserProfileJobTitle() {
    return this.jobTitle;
  }
  async getAvatar() {
    return this.avatar;
  }
  async getSignOutButton() {
    return this.cardSignOut;
  }
  async getCloseIcon() {
    return this.closeIcon;
  }
  async clickSignOut() {
    await this.cardSignOut.click();
  }
  async clickClose() {
    await this.closeIcon.click();
    await this.closeIcon.waitFor({ state: 'detached' });
  }
}
