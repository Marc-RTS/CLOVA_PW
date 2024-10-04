import { DOMAINTABLE_HEADERS, GEOTECHNICAL_THEME, HOMEPAGE_TITLE, REHABILITATION_THEME, WATER_THEME } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-31865 Domain Table Filter', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Domain Table Filter', async ({ page, banner, assetPage, mock, fxAssets, fxDomains }) => {
    const asset = fxAssets.generateAssets();
    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(fxDomains.generateDefaultDomains(), `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
  });

  test.fixme('User can view all selected as default value for theme filter', async ({ assetPage }) => {});
  test.fixme('User can see empty state when no filters selected', async ({ assetPage }) => {});
  test.fixme('User can only see selected themes', async ({ assetPage, fxDomains }) => {});
  test.fixme('User can see correct styling when theme filter selection is changed', async ({ assetPage }) => {});
  test.fixme('User can see recalculated current status when theme selection changed', async ({ assetPage }) => {});
  test.fixme('User can change number of rows per page', async ({ assetPage }) => {});
  test.fixme('User can navigate through the pages of the data table with default number of rows per page', async ({ assetPage }) => {});
});
