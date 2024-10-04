import { test, expect } from '../../baset-test';

test.describe('ADO-32160 Map Theme Filter', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('Map Theme Filter', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
    await page.goto('/');
    await expect(await banner.getBanner()).toHaveText('Clova');
  });
  test.fixme('User can view all selected as default value for map theme filter', async ({ page }) => {});
  test.fixme('User can see empty state when no filters selected', async ({ page }) => {});
  test.fixme('User can see correct styling when theme filter selection is changed', async ({ page }) => {});
  test.fixme('User cannot toggle to map view when criteria panel is open', async ({ page }) => {});
  test.fixme('User not able to view map points', async ({ page }) => {
    //GIVEN user opens the app
    //WHEN user toggles the Map view
    //AND all theme filters are deselected/inactivated
    //THEN all map points are hidden
  });
  test.fixme('User able to view map skeleton/placeholder', async ({ page }) => {});
  test.fixme('User able to select filter', async ({ page }) => {});
});
