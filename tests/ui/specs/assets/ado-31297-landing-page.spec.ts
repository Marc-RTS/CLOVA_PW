import { ASSET_ARGYLE_HEADER, HOMEPAGE_TITLE, NAV_MENU, STATUSETYPES } from '../../support/constants';
import { test, expect } from '../baset-test';

test.describe('ADO-31297 Landing Page', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Landing page', async ({ page, banner, sideNavigation }) => {
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await page.waitForLoadState();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
    await expect(await sideNavigation.getOpenDrawer()).toBeVisible();
  });
  test('User can navigate on landing page', async ({ sideNavigation }) => {
    await sideNavigation.clickOpenDrawer();
    await expect(await sideNavigation.getSideBarMenu()).toHaveText(NAV_MENU);
  });
  test('User landed on an Asset page', async ({ assetPage, fxDomains }) => {
    const asset = fxDomains.generateDefaultDomains().domains.filter((e) => e.id === 2);
    await expect(await assetPage.getAssetTitle()).toHaveText(ASSET_ARGYLE_HEADER);
    await expect(await assetPage.getDomainAssetStatus()).toHaveText('Off track'); //STATUSETYPES[`${asset[0].currentStatusId}`] enable after H2O 1.0 Release
  });
});
