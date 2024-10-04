import { HOMEPAGE_TITLE } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-36567 Domain Table Icons', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Domain Table Icons', async ({ page, banner, assetPage, mock, fxAssets, fxDomains }) => {
    const asset = fxAssets.generateAssets();
    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(fxDomains.generateDefaultDomains(), `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
  });

  test('verify themes status icons color', async ({ assetPage }) => {
    await assetPage.expandDomainSubDomain('Gap Dam');
    await assetPage.expandDomainSubDomain('Gap Dam');
    await assetPage.expandDomainSubDomain('Waste Rock Landform');
    await assetPage.expandDomainSubDomain('Limestone Creek');
    await assetPage.expandDomainSubDomain('Smoke Creek');
    await assetPage.expandDomainSubDomain('Wesley Creek');
    expect(await assetPage.getThemeSuccessIconColor()).toBe('rgb(0, 116, 97)');
    expect(await assetPage.getThemeErrorIconColor()).toBe('rgb(202, 35, 32)');
    expect(await assetPage.getThemeWarningIconColor()).toBe('rgb(191, 77, 0)');
  });
  test('verify themes status icons tooltip', async ({ assetPage }) => {
    await assetPage.expandDomainSubDomain('Gap Dam');
    await assetPage.expandDomainSubDomain('Gap Dam');
    await assetPage.expandDomainSubDomain('Waste Rock Landform');
    await assetPage.expandDomainSubDomain('Limestone Creek');
    await assetPage.expandDomainSubDomain('Smoke Creek');
    await assetPage.expandDomainSubDomain('Wesley Creek');
    await assetPage.expandDomainSubDomain('AK1 Tailings Storage Facility');
    await assetPage.expandDomainSubDomain('AK1 TSF');
    await expect(await assetPage.getIconTooltip('Good')).toBeVisible();
    // await expect(await assetPage.getIconTooltip('On Track')).toBeVisible(); enable after H2O 1.0 Release
    await expect(await assetPage.getIconTooltip('Trigger')).toBeVisible();
    // await expect(await assetPage.getIconTooltip('At Risk')).toBeVisible(); enable after H2O 1.0 Release
    await expect(await assetPage.getIconTooltip('Threshold')).toBeVisible();
    // await expect(await assetPage.getIconTooltip('Off Track')).toBeVisible(); enable after H2O 1.0 Release
    await expect(await assetPage.getIconTooltip('Pending')).toBeVisible();
  });
});
