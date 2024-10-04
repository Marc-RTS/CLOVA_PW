import { HOMEPAGE_TITLE, STATUSETYPES } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-34107 Reading Data Status', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Reading Data Status', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria, dataTable }) => {
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

  test('User can see chips for each row in table', async ({ dataTable, fxMetrics }) => {
    const metricsData = fxMetrics.generateMetrics();
    const rows = await dataTable.getDataTableRowCount();
    for (let index = 0; index < rows; index++) {
      let rowNumber = index + 1;
      await expect(await dataTable.getMetricsTableRowStatus(rowNumber)).toHaveText(STATUSETYPES[metricsData.metrics[index].statusId]);
    }
  });
  test.fixme('User can see correct status of reading data in the Data table for range measure', async ({ dataTable, fxMetrics }) => {
    // select ph Balance
    // const trigger=
    // const threshold
    // split value using '-'
    // const lowerEnd
    // const upperEnd
    // if splittedValue.count ==1
    // validate each value of a row if status is correct based on the trigger and threshold defined

    const metricsData = fxMetrics.generateMetrics();
    const rows = await dataTable.getDataTableRowCount();
    for (let index = 0; index < rows; index++) {
      let rowNumber = index + 1;
      await expect(await dataTable.getMetricsTableRowStatus(rowNumber)).toHaveText(STATUSETYPES[metricsData.metrics[index].statusId]);
    }
  });
  test.fixme('User can see correct status of reading data in the Data table for single measure', async ({ dataTable }) => {});
  test.fixme('User can view chip colour for statuses', async ({ dataTable }) => {});
});
