import { HOMEPAGE_TITLE } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-31878 Toggle To Map View And Basic Map Feature', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('Toggle To Map View And Basic Map Feature', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
    await page.goto('/');
    await expect(await banner.getBanner()).toHaveText('Clova');
  });
  test('User can toggle between domain table and map', async ({ page, assetPage, map }) => {
    await assetPage.clickMapViewFilter();
    await expect(await map.getMapCanvas()).toBeVisible();

    await assetPage.clickTableViewFilter();
    await expect(await assetPage.getDomainTable()).toBeVisible();

    await assetPage.clickMapViewFilter();
    await expect(await map.getMapCanvas()).toBeVisible();
  });
  test('User can select only one option for table and map toggle', async ({ assetPage, map }) => {
    await expect(await assetPage.getTableViewFilter()).toHaveAttribute('aria-pressed', 'true');
    await expect(await assetPage.getMapViewFilter()).toHaveAttribute('aria-pressed', 'false');
    await assetPage.clickMapViewFilter();
    await expect(await map.getMapCanvas()).toBeVisible();
    await expect(await assetPage.getTableViewFilter()).toHaveAttribute('aria-pressed', 'false');
    await expect(await assetPage.getMapViewFilter()).toHaveAttribute('aria-pressed', 'true');
  });
  test('Domain table is selected by default', async ({ assetPage }) => {
    await expect(await assetPage.getTableViewFilter()).toHaveAttribute('aria-pressed', 'true');
    await expect(await assetPage.getMapViewFilter()).toHaveAttribute('aria-pressed', 'false');
  });
  test.fixme(
    'User cannot toggle to map view when criteria panel is open',
    async ({ assetPage, mock, banner, fxMetrics, fxAssets, fxDomains, fxWaterCriteria, map }) => {
      const asset = fxAssets.generateAssets();
      const domains = fxDomains.generateDefaultDomains();
      const waterCriteria = fxWaterCriteria.generateWaterCriteria();
      const domain = domains.domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

      await assetPage.waitForDomainTableToBeLoaded();
      await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
      await mock.getMetrics(fxMetrics.generateMetrics(), `${waterCriteria.criteria.at(0)?.id}`);
      await mock.getCriteria(waterCriteria, `${domain?.id}`);
      await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);
      await assetPage.criteriaPanel.waitChartAttached();
      await expect(await assetPage.getMapViewFilter()); //check if it can be clicked
    }
  );
  test.fixme('User can interact with the map', async ({ page }) => {});
});

// test.describe('ADO-31878 Default Map view is Argyle', () => {
//   test.use({
//     storageState: 'tests/ui/utils/.auth/serviceAccountStd.json',
//     headless: true,
//   });
//   test.beforeEach('Toggle To Map View And Basic Map Feature', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
//     await page.goto('/');
//     await expect(await banner.getBanner()).toHaveText('Clova');
//   });

//   test.only('User can see default location', async ({ page, context, map, fxAssets, fxDomains, mock }) => {
//     const asset = fxAssets.generateAssets();
//     const domains = fxDomains.generateDefaultDomains();
//     await mock.getAssets(asset, `${asset.id}`);
//     await mock.getDomains(fxDomains.generateDefaultDomains(), `${asset.id}`);
//     await expect(await map.getMapCanvas()).toHaveScreenshot('argyle-geolocation.png');
//   });
// });
