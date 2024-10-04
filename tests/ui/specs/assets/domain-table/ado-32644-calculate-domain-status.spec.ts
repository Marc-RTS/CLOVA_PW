import { DOMAINTABLE_HEADERS, GEOTECHNICAL_THEME, HOMEPAGE_TITLE, REHABILITATION_THEME, WATER_THEME } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-32644 Calculate Domain Status', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Calculate Domain Status', async ({ page, banner, assetPage, mock, fxAssets, fxDomains }) => {
    const asset = fxAssets.generateAssets();
    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(fxDomains.generateDefaultDomains(), `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
  });

  test.fixme('User able to see pending on a sub-domain current status', async ({ assetPage }) => {});
  test.fixme('User able to see pending on a domain current status', async ({ assetPage }) => {});
  test.fixme('User able to see pending icon on a theme current status', async ({ assetPage }) => {});
});
