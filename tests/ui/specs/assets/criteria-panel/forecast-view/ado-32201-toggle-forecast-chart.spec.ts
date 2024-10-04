import { HOMEPAGE_TITLE } from '../../../../support/constants';
import { test, expect } from '../../../baset-test';

test.describe('ADO-32201 Toggle forecast chart', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Toggle forecast chart', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
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
    //TODO toggle forecast
  });
  test.fixme('User can toggle to view the forecast chart', async ({}) => {});
  test.fixme('User can view 3 current and 3 forecast months', async ({}) => {});
  test.fixme('User can toggle off the forecast chart', async ({}) => {});
  test.fixme('Forecast toggle is visible even when there is no forecast data', async ({}) => {});
});
