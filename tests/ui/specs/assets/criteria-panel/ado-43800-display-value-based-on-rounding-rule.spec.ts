import { HOMEPAGE_TITLE } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-43800 Display Value Based On Rounding Rules', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach(
    'Display Value Based On Rounding Rules',
    async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria, dataTable }) => {
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
    }
  );

  test.fixme('User can see rounded values of the selected criteria in current data view mode', async ({ dataTable }) => {});
  test.fixme('User can see rounded values of the selected criteria in forecast data view mode', async ({ dataTable }) => {});
  test.fixme('User can see rounded values in the Data table', async ({ dataTable }) => {});
});
