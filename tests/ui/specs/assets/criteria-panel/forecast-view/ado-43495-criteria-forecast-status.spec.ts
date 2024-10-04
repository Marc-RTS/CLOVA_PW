import { HOMEPAGE_TITLE } from '../../../../support/constants';
import { test, expect } from '../../../baset-test';

test.describe('ADO-43495 Criteria Forecast Chart', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Criteria Forecast Chart', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
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
  test.fixme('User can see calculated criteria forecast status from criteria dropdown list', async ({ criteriaPanel, fxDomains }) => {});
  test.fixme('User can see pending criteria forecast status for selected criteria that have no forecast value', async ({ criteriaPanel, fxDomains }) => {});
  test.fixme('User can see worst to good status ordering of criteria forecast status from criteria dropdown list', async ({ criteriaPanel, fxDomains }) => {});
});
