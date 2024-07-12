import { Page, Locator } from '@playwright/test';
import BasePage from '../../base.page';

export default class SideNavigation extends BasePage {
  readonly openDrawer: Locator;
  readonly leftSidebarMenu: Locator;
  readonly assetsMenu: Locator;
  readonly aboutMenu: Locator;
  constructor(page: Page) {
    super(page);
    this.openDrawer = this.page.getByTestId('open-drawer-link');
    this.leftSidebarMenu = this.page.getByTestId('left-sidebar-menu').getByRole('listitem');
    this.assetsMenu = this.page.getByTestId('assets-link');
    this.aboutMenu = this.page.getByTestId('about-link');
  }

  async init(): Promise<this> {
    return this;
  }
  async getOpenDrawer() {
    return this.openDrawer;
  }
  async getAssetMenu() {
    return this.assetsMenu;
  }
  async getAboutMenu() {
    return this.aboutMenu;
  }
  async clickOpenDrawer() {
    await this.openDrawer.click();
  }
  async getSideBarMenu() {
    return this.leftSidebarMenu;
  }
}
