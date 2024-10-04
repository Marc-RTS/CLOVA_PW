import { test, expect } from '../../baset-test';
test.use({
  storageState: 'tests/ui/utils/.auth/serviceAccountStd.json',
  headless: true,
});
test.describe('ADO-31878 Default Map view is Argyle', () => {
  test.beforeEach('Map view is Argyle', async ({ page, banner, assetPage, fxAssets, fxDomains, mock }) => {
    await page.goto('/');
    await expect(await banner.getBanner()).toHaveText('Clova');
    const asset = fxAssets.generateAssets();

    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(fxDomains.generateDefaultDomains(), `${asset.id}`);
    await assetPage.clickMapViewFilter();

    await page.waitForResponse(`**/assets/FeatureLayerBase**`, { timeout: 90000 });
    await page.waitForResponse(`**/assets/fieldProperties**`, { timeout: 90000 });
  });

  test.skip('User can see default location', async ({ map }) => {
    await expect(await map.getMapCanvas()).toHaveScreenshot('argyle-geolocation.png');
  });
});
