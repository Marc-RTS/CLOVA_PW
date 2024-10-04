import { DOMAINTABLE_HEADERS, GEOTECHNICAL_THEME, HOMEPAGE_TITLE, REHABILITATION_THEME, WATER_THEME } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-36567 Domain Table', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Domain Table', async ({ page, banner, assetPage, mock, fxAssets, fxDomains }) => {
    const asset = fxAssets.generateAssets();
    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(fxDomains.generateDefaultDomains(), `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
  });

  test('has domain table headers', async ({ assetPage }) => {
    const loadedHeaders = await assetPage.getDomainsTableHeader();

    DOMAINTABLE_HEADERS.forEach((h, index) => {
      const header = loadedHeaders[index];
      expect(h, `Expected Header ${h} is equal to table header ${header} `).toEqual(header);
    });
  });
  test('has correct domain total rows', async ({ assetPage }) => {
    const domainRows = await assetPage.getDomainRows();
    await expect(await assetPage.getTableRowCount()).toHaveText(`1–${domainRows} of ${domainRows}`);
  });
  test('has correct theme icon and text', async ({ assetPage, fxDomains }) => {
    const asset = fxDomains.generateDefaultDomains().domains.find((e) => e.nodeType === 'Theme' && e.name === WATER_THEME);
    await assetPage.expandDomainSubDomain(`${asset?.path.at(0)}`);
    await assetPage.expandDomainSubDomain(`${asset?.path.at(1)}`);
    await expect(await assetPage.getRowWaterIcon()).toHaveText(`${asset?.name}`);
  });
  test('data table filter has correct theme icon and text', async ({ assetPage }) => {
    await expect(await assetPage.getFilterWaterIcon()).toHaveText(WATER_THEME);
    await expect(await assetPage.getFilterGeotechnicalIcon()).toHaveText(GEOTECHNICAL_THEME);
    await expect(await assetPage.getFilterRehabilitationIcon()).toHaveText(REHABILITATION_THEME);
  });
  test.fixme('User able to see pending on a sub-domain current status', async ({ assetPage }) => {});
  test.fixme('User able to see pending on a domain current status', async ({ assetPage }) => {});
  test.fixme('User able to see pending icon on a theme current status', async ({ assetPage }) => {});
});
