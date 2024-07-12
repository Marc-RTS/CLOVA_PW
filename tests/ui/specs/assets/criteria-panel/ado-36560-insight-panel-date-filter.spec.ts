import { HOMEPAGE_TITLE } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-36560 Insight Panel Date Filter', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Insight Panel Date Filter', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, dataTable, fxWaterCriteria, fxMetrics }) => {
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
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
    await mock.getMetrics(fxMetrics.generateMetrics(), `${waterCriteria.criteria.at(0)?.id}`);
    await mock.getCriteria(waterCriteria, `${domain?.id}`);
    await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);
    await dataTable.waitDataTableAttached();
  });
  test('User can view 6M as default value for date filter', async ({ criteriaPanel }) => {
    await expect(await criteriaPanel.getDateFilterButton('6M')).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('3M')).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('ALL')).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('6M')).toHaveAttribute('aria-pressed', 'true');
    await expect(await criteriaPanel.getDateFilterButton('3M')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('ALL')).toHaveAttribute('aria-pressed', 'false');
  });

  test('User can select only one option for date filter', async ({ criteriaPanel }) => {
    await expect(await criteriaPanel.getDateFilterButton('6M')).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('3M')).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('ALL')).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('6M')).toHaveAttribute('aria-pressed', 'true');
    await expect(await criteriaPanel.getDateFilterButton('3M')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('ALL')).toHaveAttribute('aria-pressed', 'false');

    await criteriaPanel.clickDateFilterButton('1Y');
    await expect(await criteriaPanel.getDateFilterButton('6M')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('3M')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toHaveAttribute('aria-pressed', 'true');
    await expect(await criteriaPanel.getDateFilterButton('ALL')).toHaveAttribute('aria-pressed', 'false');

    await criteriaPanel.clickDateFilterButton('ALL');
    await expect(await criteriaPanel.getDateFilterButton('6M')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('3M')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('ALL')).toHaveAttribute('aria-pressed', 'true');

    await criteriaPanel.clickDateFilterButton('3M');
    await expect(await criteriaPanel.getDateFilterButton('6M')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('3M')).toHaveAttribute('aria-pressed', 'true');
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toHaveAttribute('aria-pressed', 'false');
    await expect(await criteriaPanel.getDateFilterButton('ALL')).toHaveAttribute('aria-pressed', 'false');
  });
});
test.describe('ADO-36560 Insight Panel Date Filter - No Metrics', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Insight Panel No Metrics', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria, dataTable }) => {
    const asset = fxAssets.generateAssets();
    const domains = fxDomains.generateDefaultDomains();
    const waterCriteria = fxWaterCriteria.generateWaterCriteriaAllLastMetricAsNull();
    const domain = domains.domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(domains, `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await page.waitForLoadState();
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
    await mock.getCriteria(waterCriteria, `${domain?.id}`);
    await mock.getMetrics(fxMetrics.generateNoMetrics(), `${waterCriteria.criteria.at(0)?.id}`);
    await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);
  });
  test('Date filter is disabled when there is no metric data to display', async ({ criteriaPanel }) => {
    await expect(await criteriaPanel.getMetricsFilter()).toBeVisible();
    await expect(await criteriaPanel.getDateFilterButton('3M')).toBeDisabled();
    await expect(await criteriaPanel.getDateFilterButton('6M')).toBeDisabled();
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toBeDisabled();
    await expect(await criteriaPanel.getDateFilterButton('All')).toBeDisabled();
  });
});
test.describe('ADO-36560 Insight Panel Date Filter - No Criteria and Metrics', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('Insight Panel No Criteria and Metrics', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
    const asset = fxAssets.generateAssets();
    const domains = fxDomains.generateDefaultDomains();
    const waterCriteria = fxWaterCriteria.generateNoWaterCriteria();
    const domain = domains.domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(domains, `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await page.waitForLoadState();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
    await assetPage.waitForDomainTableToBeLoaded();
    await mock.getCriteria(waterCriteria, `${domain?.id}`);
    await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);
  });
  test('Date filter & Data Information is not shown when there is no data to display', async ({ criteriaPanel }) => {
    await expect(await criteriaPanel.getMetricsFilter()).toBeHidden();
  });
});

test.describe('ADO-36560 Insight Panel Date Filter - Number of Records', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Insight Panel Number Of Records', async ({ page, mock, banner, assetPage, fxAssets, fxDomains, dataTable }) => {
    const asset = fxAssets.generateAssets();
    const domains = fxDomains.generateDefaultDomains();
    const domain = domains.domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(domains, `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await page.waitForLoadState();
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
    await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);
    await dataTable.waitDataTableAttached();
  });
  test('User can view different number of records over different periods', async ({ criteriaPanel }) => {
    await expect(await criteriaPanel.getDateFilterButton('6M')).toHaveAttribute('aria-pressed', 'true');
    const months6Values = await criteriaPanel.getChartXAxisValues();

    await criteriaPanel.clickDateFilterButton('1Y');
    await expect(await criteriaPanel.getDateFilterButton('1Y')).toHaveAttribute('aria-pressed', 'true');
    const yr1Values = await criteriaPanel.getChartXAxisValues();
    expect(months6Values, `${months6Values} should not be equal to ${yr1Values}`).not.toEqual(yr1Values);

    await criteriaPanel.clickDateFilterButton('All');
    await expect(await criteriaPanel.getDateFilterButton('All')).toHaveAttribute('aria-pressed', 'true');
    const allValues = await criteriaPanel.getChartXAxisValues();
    expect(yr1Values, `${yr1Values} should not be equal to ${allValues}`).not.toEqual(allValues);

    await criteriaPanel.clickDateFilterButton('3M');
    await expect(await criteriaPanel.getDateFilterButton('3M')).toHaveAttribute('aria-pressed', 'true');
    const months3Values = await criteriaPanel.getChartXAxisValues();
    expect(allValues, `${allValues} should not be equal to ${months3Values}`).not.toEqual(months3Values);
  });
  test('User can view different number of records when selecting All', async ({ dataTable, criteriaPanel }) => {
    await expect(await criteriaPanel.getDateFilterButton('6M')).toHaveAttribute('aria-pressed', 'true');
    await expect(await criteriaPanel.getDateFilterButton('6M')).toBeVisible();
    const currentNumberOfRecords = await dataTable.getTotalNumberOfReadingDataRecords();
    await criteriaPanel.clickDateFilterButton('ALL');
    expect(await dataTable.getTotalNumberOfReadingDataRecords()).toBeGreaterThan(currentNumberOfRecords);
  });
});
