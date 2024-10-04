import { test, expect } from '../../baset-test';

test.use({
  storageState: 'tests/ui/utils/.auth/serviceAccountStd.json',
  headless: true, //image verificaiton tests locked to headless for docker and ci to run
});

test.describe('ADO-37492 Criteria Insight Panel Locked Y Axis', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('Criteria Insight Panel Locked Y Axis', async ({ page, banner, assetPage, mock, fxAssets, fxDomains }) => {
    const asset = fxAssets.generateAssets();
    const domains = fxDomains.generateDefaultDomains();

    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(domains, `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await page.waitForLoadState();

    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText('Clova');
  });
  test.skip('User cannot see all reading data that falls outside the Y axis', async ({
    mock,
    fxMetrics,
    fxWaterCriteria,
    fxDomains,
    assetPage,
    criteriaPanel,
  }) => {
    const domains = fxDomains.generateDefaultDomains();
    const waterCriteria = fxWaterCriteria.generateWaterCriteria();
    const domain = domains.domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

    await mock.getMetrics(fxMetrics.generateUpdateLatestMetricValue(10000, 5), `${waterCriteria.criteria.at(0)?.id}`);
    await mock.getCriteria(waterCriteria, `${domain?.id}`);
    await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);

    await expect(await criteriaPanel.getChartXAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartYAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartDataLine()).toHaveScreenshot('outside-y-axis-min-and-max-values.png');
  });
  test('User can see Y - axis absolute values', async ({ page, mock, fxMetrics, fxWaterCriteria, fxDomains, assetPage, criteriaPanel }) => {
    const domains = fxDomains.generateDefaultDomains();
    const waterCriteria = fxWaterCriteria.generateWaterCriteria();
    const domain = domains.domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

    await mock.getMetrics(fxMetrics.generateUpdateLatestMetricValue(10000, 5), `${waterCriteria.criteria.at(0)?.id}`);
    await mock.getCriteria(waterCriteria, `${domain?.id}`);
    await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);

    await expect(await criteriaPanel.getChartXAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartYAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartYAxis()).toHaveScreenshot('absolute-values.png');
  });
  test.skip('User can see all reading data that is within the Y axis', async ({ mock, fxMetrics, fxWaterCriteria, fxDomains, assetPage, criteriaPanel }) => {
    const domains = fxDomains.generateDefaultDomains();
    const waterCriteria = fxWaterCriteria.generateWaterCriteria();
    const domain = domains.domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

    await mock.getMetrics(fxMetrics.generateUpdateLatestMetricValue(2000, 6), `${waterCriteria.criteria.at(0)?.id}`);
    await mock.getCriteria(waterCriteria, `${domain?.id}`);
    await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);

    await expect(await criteriaPanel.getChartXAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartYAxis()).toBeVisible();
    await expect(await criteriaPanel.getChartDataLine()).toHaveScreenshot('reading-data-within-range.png');
  });
});
