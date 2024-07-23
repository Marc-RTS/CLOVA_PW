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
  test('User can view more criteria insights on the side drawer', async ({ assetPage, fxDomains }) => {
    const asset = fxDomains.generateDefaultDomains().domains.find((e) => e.nodeType === 'Theme' && e.name === 'Water');
    await expect(await assetPage.criteriaPanel.getDomain()).toHaveText(`${asset?.path.at(0)}`);
    await expect(await assetPage.criteriaPanel.getSubDomain()).toHaveText(`${asset?.path.at(1)}`);
    await expect(await assetPage.criteriaPanel.getCriteriaDropdown()).toBeVisible();
    await expect(await assetPage.criteriaPanel.getThemeWaterIcon()).toBeVisible();
    await expect(await assetPage.criteriaPanel.getCriteriaLastValue()).toBeVisible();
    await expect(await assetPage.criteriaPanel.getTriggerValue()).toBeVisible();
    await expect(await assetPage.criteriaPanel.getThresholdValue()).toBeVisible();
    await expect(await assetPage.criteriaPanel.getChart()).toBeVisible();
    await expect(await assetPage.criteriaPanel.getMetricsFilter()).toBeVisible();
    await expect(await assetPage.criteriaPanel.dataTable.getMetricsTable()).toBeVisible();
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
    await expect(await dataTable.getMetricsTableRowStatus(1)).toHaveText(STATUSETYPES[fxMetrics.generateMetrics().metrics[0].statusId]);
    await expect(await dataTable.getMetricsTableRowValue(1)).toHaveText(fxMetrics.generateMetrics().metrics[0].value.toFixed());
    await expect(await dataTable.getMetricsTableRowDate(1)).toHaveText('09 Jun 2024'); //fixme
    await expect(await dataTable.getMetricsTableRowSource(1)).toHaveText('');
    await expect(await dataTable.getMetricsTableRowStatus(2)).toHaveText(STATUSETYPES[fxMetrics.generateMetrics().metrics[1].statusId]);
    await expect(await dataTable.getMetricsTableRowValue(2)).toHaveText(fxMetrics.generateMetrics().metrics[1].value.toFixed());
    await expect(await dataTable.getMetricsTableRowDate(2)).toHaveText('02 Jun 2024'); //fixme
    await expect(await dataTable.getMetricsTableRowSource(2)).toHaveText('');
  });
});
