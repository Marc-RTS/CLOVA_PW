import { HOMEPAGE_TITLE } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-32515 Insight Panel Criteria Dropdown', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Insight Panel Criteria Dropdown', async ({ page, banner, assetPage, mock, fxAssets, fxDomains, fxMetrics, fxWaterCriteria }) => {
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
    const criteriaPanel = await assetPage.clickTheme(`${domain?.path[0]}`, `${domain?.path[1]}`, `${domain?.path[2]}`);
    await criteriaPanel.waitChartAttached();
  });

  test('User can view default selected criteria from the dropdown', async ({ criteriaPanel }) => {
    const selected = (await criteriaPanel.getCriteriaDropdownSelected()) ?? '';
    await criteriaPanel.clickCriteriaDropdown();
    await expect(await criteriaPanel.getCriteriaDropdownMenu()).toBeVisible();
    await expect(await criteriaPanel.getCriteriaDropdownMenuText(0)).toBeVisible();
    await expect(await criteriaPanel.getCriteriaDropdownMenuText(0)).toHaveText(selected);
  });

  test('User can view different criteria options', async ({ criteriaPanel, fxWaterCriteria }) => {
    await criteriaPanel.clickCriteriaDropdown();
    await expect(await criteriaPanel.getCriteriaDropdownMenu()).toBeVisible();
    const arr = fxWaterCriteria.generateWaterCriteria().criteria;
    arr.forEach(async (e, index) => {
      await expect(await criteriaPanel.getCriteriaDropdownMenuText(index)).toBeVisible();
      await expect(await criteriaPanel.getCriteriaDropdownMenuText(index)).toHaveText(`${e.name}`);
    });
  });
});
