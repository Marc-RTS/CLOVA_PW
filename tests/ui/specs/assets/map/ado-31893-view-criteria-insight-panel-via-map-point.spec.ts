import { AK1_TSF_X, AK1_TSF_Y, SMOKE_CREEK_X, SMOKE_CREEK_Y } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-31893 View Criteria Insight Panle Via Map Point', () => {
  test.use({
    storageState: 'tests/ui/utils/.auth/serviceAccountStd.json',
    actionTimeout: 60000,
  });
  test.beforeEach('View Criteria Insight Panle Via Map Point', async ({ page, banner }) => {
    await page.goto('/');
    await expect(await banner.getBanner()).toHaveText('Clova');
    await page.getByTestId('map-view-filter-button').click();
  });
  test('User able to select another map point while criteria insight panel is opened', async ({ criteriaPanel, map }) => {
    await map.clickSmokeCreekMapPoint();
    await expect(await criteriaPanel.getDomain()).toHaveText('Waste Rock Landform');
    await expect(await criteriaPanel.getSubDomain()).toHaveText('Smoke Creek');

    await map.clickAk1TsfMapPoint();
    await expect(await criteriaPanel.getDomain()).toHaveText('AK1 Tailings Storage Facility');
    await expect(await criteriaPanel.getSubDomain()).toHaveText('AK1 TSF');
  });
  test('User able to close the criteria insight panel in map view via clicking X button', async ({ criteriaPanel, map }) => {
    await map.clickSmokeCreekMapPoint();
    await expect(await criteriaPanel.getDomain()).toHaveText('Waste Rock Landform');
    await expect(await criteriaPanel.getSubDomain()).toHaveText('Smoke Creek');
    await criteriaPanel.closeDrawer();
    await expect(await criteriaPanel.getCriteriaPanel()).toBeHidden();
  });
  test('User able to close the criteria insight panel in map view via clicking outside the map', async ({ criteriaPanel, banner, map }) => {
    await map.clickSmokeCreekMapPoint();
    await expect(await criteriaPanel.getDomain()).toHaveText('Waste Rock Landform');
    await expect(await criteriaPanel.getSubDomain()).toHaveText('Smoke Creek');
    await banner.clickClovaBannerLogo();
    expect(await criteriaPanel.getCriteriaPanelVisibility()).toContain('hidden');
  });
});
