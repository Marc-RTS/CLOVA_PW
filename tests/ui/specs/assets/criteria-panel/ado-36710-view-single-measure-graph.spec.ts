import { test, expect } from '../../baset-test';

test.describe('ADO-36710 View Single Measure Graph', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('View Single Measure Graph', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
    const asset = fxAssets.generateAssets();
    const domains = fxDomains.generateDefaultDomains();
    const waterCriteria = fxWaterCriteria.generateWaterCriteria();
    const domain = domains.domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(domains, `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await page.waitForLoadState();
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText('Clova');
    await mock.getMetrics(fxMetrics.generateMetrics(), `${waterCriteria.criteria.at(0)?.id}`);
    await mock.getCriteria(waterCriteria, `${domain?.id}`);
    await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);
  });
  test('User can see single measure graph elements', async ({ criteriaPanel }) => {
    await criteriaPanel.selectCriteria('Electrical Conductivity');
    await expect(await criteriaPanel.getChartXAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartYAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartTriggerMaxLine()).toBeAttached();
    await expect(await criteriaPanel.getChartThresholdMaxLine()).toBeAttached();
    await expect(await criteriaPanel.getChartThresholdArea()).toBeAttached();
    await expect(await criteriaPanel.getChartDataLine()).toBeAttached();
  });
});
