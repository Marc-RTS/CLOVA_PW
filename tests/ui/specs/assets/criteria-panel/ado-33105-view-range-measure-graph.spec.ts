import { test, expect } from '../../baset-test';

test.describe('ADO-33105 View Range Measure Graph', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('View Range Measure Graph', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria, criteriaPanel }) => {
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
    await criteriaPanel.waitChartAttached();
    await criteriaPanel.selectCriteria('ph Balance');
  });
  test('User can see range measure graph elements', async ({ criteriaPanel }) => {
    await expect(await criteriaPanel.getChartXAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartYAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartTriggerMinLine()).toBeAttached();
    await expect(await criteriaPanel.getChartTriggerMaxLine()).toBeAttached();
    await expect(await criteriaPanel.getChartThresholdMinLine()).toBeAttached();
    await expect(await criteriaPanel.getChartThresholdMaxLine()).toBeAttached();
    await expect(await criteriaPanel.getChartThresholdArea()).toBeAttached();
    await expect(await criteriaPanel.getChartDataLine()).toBeAttached();
  });
  test('User can see range measure graph y values', async ({ criteriaPanel }) => {
    await expect(await criteriaPanel.getChartYAxis()).toBeVisible();
    const preDefinedValues = ['5', '6', '7', '8', '9', '10'];
    const values = await criteriaPanel.getChartYAxisValues();

    preDefinedValues.forEach((h, index) => {
      expect(values[index]).toEqual(h);
    });
  });
});
