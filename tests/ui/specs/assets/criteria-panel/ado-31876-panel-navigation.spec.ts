import { HOMEPAGE_TITLE } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-31876 Go to side insight side panel', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Criteria Insight Panel Navigation', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
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
  });
  test('User can navigate to criteria panel', async ({ criteriaPanel, fxDomains }) => {
    const domains = fxDomains.generateDefaultDomains();
    const domain = domains.domains.filter((e) => e.nodeType === 'Theme' && e.name === 'Water').at(0);
    await expect(await criteriaPanel.getCriteriaPanel()).toBeVisible();
    await expect(await criteriaPanel.getSubDomain()).toHaveText(`${domain?.path[1]}`);
  });
  test('User can close to criteria panel by clicking close button', async ({ criteriaPanel }) => {
    await expect(await criteriaPanel.getCriteriaPanel()).toBeVisible();
    await criteriaPanel.closeDrawer();
    await expect(await criteriaPanel.getCriteriaPanel()).toBeHidden();
  });
  test('User can close to criteria panel by clicking away', async ({ criteriaPanel, common }) => {
    await expect(await criteriaPanel.getCriteriaPanel()).toBeVisible();
    await common.banner.clickClovaBannerLogo();
    await expect(await criteriaPanel.getCriteriaPanel()).toBeHidden();
  });
});
