import { test, expect } from '../baset-test';

test.describe('ADO-31876 Go to side insight side panel', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('Criteria Insight Panel Navigation', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
    await page.goto('/');
    await expect(await banner.getBanner()).toHaveText('Clova');
  });
  test.skip('test', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('map-view-filter-button').click();
    await page.getByText('Off Track').click();
    await page.locator('canvas').click({
      position: {
        x: 1134,
        y: 107,
      },
    });
    await page.locator('canvas').click({
      position: {
        x: 1142,
        y: 403,
      },
    });
    await page.getByRole('application').click({
      position: {
        x: 747,
        y: 205,
      },
    });
    await page.locator('canvas').click({
      position: {
        x: 702,
        y: 569,
      },
    });
    await page.locator('canvas').click({
      position: {
        x: 1167,
        y: 296,
      },
    });
  });
});
