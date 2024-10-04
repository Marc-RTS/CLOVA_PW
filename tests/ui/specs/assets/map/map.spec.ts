import {
  AK1_TSF_X,
  AK1_TSF_Y,
  GAP_DAM_X,
  GAP_DAM_Y,
  LIMESTONE_CREEK_X,
  LIMESTONE_CREEK_Y,
  PIT_LAKE_X,
  PIT_LAKE_Y,
  SMOKE_CREEK_X,
  SMOKE_CREEK_Y,
  WESLEY_CREEK_X,
  WESLEY_CREEK_Y,
  WESLEY_SPRINGS_X,
  WESLEY_SPRINGS_Y,
} from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-31876 Go to side insight side panel', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('Criteria Insight Panel Navigation', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
    await page.goto('/');
    await expect(await banner.getBanner()).toHaveText('Clova');
  });

  test.skip('test map points', async ({ page, assetPage }) => {
    await page.getByTestId('map-view-filter-button').click();
    await page.getByTestId('domains-forecast-data-filter-button').click();
    await page.getByTestId('domains-current-data-filter-button').click();
    await page.getByTestId('domains-rehabilitation-filter-button').click();
    await page.getByTestId('domains-geotechnical-filter-button').click();
    await page.getByTestId('domains-water-filter-button').click();
    await page.getByTestId('domains-water-filter-button').click();
    await page.getByTestId('domains-geotechnical-filter-button').click();
    await page.getByTestId('domains-rehabilitation-filter-button').click();

    //Smoke Creek
    await page.locator('canvas').click({
      position: {
        x: SMOKE_CREEK_X,
        y: SMOKE_CREEK_Y,
      },
    });
    await expect(await assetPage.criteriaPanel.getDomain()).toHaveText('Waste Rock Landform');
    await expect(await assetPage.criteriaPanel.getSubDomain()).toHaveText('Smoke Creek');
    await page.locator('canvas').click({
      position: {
        x: AK1_TSF_X,
        y: AK1_TSF_Y,
      },
    });
    await expect(await assetPage.criteriaPanel.getDomain()).toHaveText('AK1 Tailings Storage Facility');
    await expect(await assetPage.criteriaPanel.getSubDomain()).toHaveText('AK1 TSF');
    await page.locator('canvas').click({
      position: {
        x: LIMESTONE_CREEK_X,
        y: LIMESTONE_CREEK_Y,
      },
    });
    await expect(await assetPage.criteriaPanel.getDomain()).toHaveText('Waste Rock Landform');
    await expect(await assetPage.criteriaPanel.getSubDomain()).toHaveText('Limestone Creek');
    await page.locator('canvas').click({
      position: {
        x: GAP_DAM_X,
        y: GAP_DAM_Y,
      },
    });
    await expect(await assetPage.criteriaPanel.getDomain()).toHaveText('Gap Dam');
    await expect(await assetPage.criteriaPanel.getSubDomain()).toHaveText('Gap Dam');
    await page.locator('canvas').click({
      position: {
        x: WESLEY_CREEK_X,
        y: WESLEY_CREEK_Y,
      },
    });
    await expect(await assetPage.criteriaPanel.getDomain()).toHaveText('Waste Rock Landform');
    await expect(await assetPage.criteriaPanel.getSubDomain()).toHaveText('Wesley Creek');

    await page.locator('canvas').click({
      position: {
        x: PIT_LAKE_X,
        y: PIT_LAKE_Y,
      },
    });
    await expect(await assetPage.criteriaPanel.getDomain()).toHaveText('Open Pit & Underground');
    await expect(await assetPage.criteriaPanel.getSubDomain()).toHaveText('Pit Lake');

    await page.locator('canvas').click({
      position: {
        x: WESLEY_SPRINGS_X,
        y: WESLEY_SPRINGS_Y,
      },
    });
    await expect(await assetPage.criteriaPanel.getDomain()).toHaveText('Wesley Springs');
    await expect(await assetPage.criteriaPanel.getSubDomain()).toHaveText('Wesley Springs');
  });
});
