import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';
import SideNavigation from './side-navigation';
import Banner from './banner';
import Poppers from './poppers';

export default class Common extends BasePage {
  readonly sideNavigation: SideNavigation;
  readonly poppers: Poppers;
  readonly banner: Banner;
  readonly backDrop: Locator;

  constructor(page: Page) {
    super(page);
    this.sideNavigation = new SideNavigation(page);
    this.poppers = new Poppers(page);
    this.banner = new Banner(page);
    this.backDrop = this.page.locator('.MuiBackdrop-root');
  }

  async init(): Promise<this> {
    return this;
  }

  async clickBackDrop() {
    await this.backDrop.click();
    await this.backDrop.waitFor({ state: 'detached' });
  }
}
