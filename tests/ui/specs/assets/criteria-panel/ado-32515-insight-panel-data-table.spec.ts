import { HOMEPAGE_TITLE } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-32515 Insight Panel Data Table', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Insight Panel Data Table', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria, dataTable }) => {
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

  test('User can change number of rows per page', async ({ dataTable }) => {
    await expect(await dataTable.getDataTable()).toBeVisible();
    await dataTable.selectRowsPerPage('10');
    await expect(await dataTable.getCurrentRowPerPage()).toHaveText('10');
    expect(await dataTable.getDataTableRowCount()).toEqual(10);
    await dataTable.selectRowsPerPage('25');
    await expect(await dataTable.getCurrentRowPerPage()).toHaveText('25');
    expect(await dataTable.getDataTableRowCount()).toEqual(25);
    await dataTable.selectRowsPerPage('50');
    await expect(await dataTable.getCurrentRowPerPage()).toHaveText('50');
    expect(await dataTable.getDataTableRowCount()).toEqual(26);
  });

  test('User can navigate through the pages of the data table with default number of rows per page', async ({ dataTable }) => {
    await expect(await dataTable.getDataTable()).toBeVisible();
    await expect(await dataTable.getCurrentRowPerPage()).toContainText('5');
    expect(await dataTable.getDataTableRowCount()).toEqual(5);
    await expect(await dataTable.getDisplayRows()).toContainText('1–5 of');
    await dataTable.clickNext();
    await expect(await dataTable.getDisplayRows()).toContainText('6–10 of');
    expect(await dataTable.getDataTableRowCount()).toEqual(5);
    await dataTable.clickPrevious();
    await expect(await dataTable.getDisplayRows()).toContainText('1–5 of');
    expect(await dataTable.getDataTableRowCount()).toEqual(5);
  });
});
