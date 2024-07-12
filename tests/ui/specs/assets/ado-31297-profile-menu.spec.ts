import { HOMEPAGE_TITLE } from '../../support/constants';
import { test, expect } from '../baset-test';

test.describe('ADO-31297 Profile Menu', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('User Profile Menu', async ({ page, banner, sideNavigation }) => {
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await page.waitForLoadState();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
    await expect(await sideNavigation.getOpenDrawer()).toBeVisible();
    await banner.clickUserAvatar();
  });
  test('User interaction with the profile menu', async ({ poppers }) => {
    await expect(await poppers.getUserProfilePopper()).toBeVisible();
    await expect(await poppers.getUserProfileFullName()).toHaveText('SA-AU-DP-CLO-Std');
    await expect(await poppers.getUserProfileEmail()).toHaveText('sa-au-dp-clo-std@riotinto.com');
    // await expect(await common.poppers.getUserProfileJobTitle()).toHaveText('Senior Tester');
    await expect(await poppers.getAvatar()).toBeVisible();
    await expect(await poppers.getSignOutButton()).toBeVisible();
    await expect(await poppers.getCloseIcon()).toBeVisible();
  });
  test('User can close the profile card clicking away', async ({ common, poppers }) => {
    await expect(await poppers.getUserProfilePopper()).toBeVisible();
    await common.clickBackDrop();
    await expect(await poppers.getUserProfilePopper()).toBeHidden();
  });
  test('User can close the profile card by clicking close button', async ({ poppers }) => {
    await expect(await poppers.getUserProfilePopper()).toBeVisible();
    await poppers.clickClose();
    await expect(await poppers.getUserProfilePopper()).toBeHidden();
  });
});
