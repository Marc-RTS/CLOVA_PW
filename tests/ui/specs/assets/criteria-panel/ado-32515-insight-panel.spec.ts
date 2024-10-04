import { test, expect } from '../../baset-test';
import { HOMEPAGE_TITLE, STATUSETYPES } from '../../../support/constants';

test.describe('ADO-32515 Criteria Insight Panel', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Criteria Insight Panel', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
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
    await assetPage.criteriaPanel.waitChartAttached();
    await assetPage.criteriaPanel.dataTable.waitDataTableAttached();
  });
  test('User can view more criteria insights on the side drawer', async ({ assetPage, fxDomains, criteriaPanel }) => {
    const asset = fxDomains.generateDefaultDomains().domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');

    await expect(await criteriaPanel.getDomain()).toHaveText(`${asset?.path.at(0)}`);
    await expect(await criteriaPanel.getSubDomain()).toHaveText(`${asset?.path.at(1)}`);
    await expect(await criteriaPanel.getCriteriaDropdown()).toBeVisible();
    await expect(await criteriaPanel.getThemeWaterIcon()).toBeVisible();
    await expect(await criteriaPanel.getCriteriaLastValue()).toBeVisible();
    await expect(await criteriaPanel.getTriggerValue()).toBeVisible();
    await expect(await criteriaPanel.getThresholdValue()).toBeVisible();
    await expect(await criteriaPanel.getChart()).toBeVisible();
    await expect(await criteriaPanel.getMetricsFilter()).toBeVisible();
    await expect(await criteriaPanel.dataTable.getMetricsTable()).toBeVisible();
  });

  test('User can view related value, trigger and threshold of the selected criteria', async ({ criteriaPanel, fxWaterCriteria }) => {
    const waterCriteria = fxWaterCriteria.generateWaterCriteria();
    const ec = waterCriteria.criteria.find((e) => e.name === 'Electrical Conductivity');
    const phBalance = waterCriteria.criteria.find((e) => e.name === 'pH Balance');

    await criteriaPanel.selectCriteria(`${ec?.name}`);
    expect(await criteriaPanel.getCriteriaLastValue()).toHaveText(`${ec?.lastMetric?.value?.toFixed()}`);
    expect(await criteriaPanel.getTriggerValue()).toHaveText(`${ec?.trigger.to.toString()}`);
    expect(await criteriaPanel.getThresholdValue()).toHaveText(`${ec?.threshold.to.toString()}`);

    await criteriaPanel.selectCriteria(`${phBalance?.name}`);
    await criteriaPanel.waitChartDataLineTobeAttached();
    await expect(await criteriaPanel.getCriteriaLastValue()).toHaveText(`${phBalance?.lastMetric?.value?.toFixed(1)}`);
    await expect(await criteriaPanel.getTriggerValue()).toHaveText(`${phBalance?.trigger.from.toFixed(1)} - ${phBalance?.trigger.to.toFixed(1)}`);
    await expect(await criteriaPanel.getThresholdValue()).toHaveText(`${phBalance?.threshold.from.toFixed(1)} - ${phBalance?.threshold.to.toFixed(1)}`);
  });
  test('User can view data table record for a date', async ({ fxMetrics, dataTable }) => {
    const metricsData = fxMetrics.generateMetrics();
    const rows = await dataTable.getDataTableRowCount();
    for (let index = 0; index < rows; index++) {
      let rowNumber = index + 1;
      await expect(await dataTable.getMetricsTableRowStatus(rowNumber)).toHaveText(STATUSETYPES[metricsData.metrics[index].statusId]);
      await expect(await dataTable.getMetricsTableRowValue(rowNumber)).toHaveText(metricsData.metrics[index].value.toFixed());
      await expect(await dataTable.getMetricsTableRowDate(rowNumber)).toHaveText(metricsData.metrics[index].date);
      await expect(await dataTable.getMetricsTableRowSource(rowNumber)).toHaveText('');
    }
  });
});
