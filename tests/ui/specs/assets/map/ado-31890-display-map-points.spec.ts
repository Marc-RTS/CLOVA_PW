import { test, expect } from '../../baset-test';

test.describe('ADO-31890 Display Map Points', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('Display Map Points', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
    await page.goto('/');
    await expect(await banner.getBanner()).toHaveText('Clova');
  });
  test.fixme('User can select point on the map', async ({ page }) => {});
  test.fixme('User able to unselect a map point', async ({ page }) => {});
});
