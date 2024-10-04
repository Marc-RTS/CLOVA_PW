import { HOMEPAGE_TITLE } from '../../support/constants';
import { test, expect } from '../baset-test';

test.describe('ADO-31297 Navigation Menu', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Navigation Menu', async ({ page, banner, sideNavigation }) => {
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await page.waitForLoadState();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
    await expect(await sideNavigation.getOpenDrawer()).toBeVisible();
  });
  test('has side bar menu', async ({ sideNavigation }) => {
    await expect(await sideNavigation.getAssetMenu()).toBeVisible();
  });
});
