import { HOMEPAGE_TITLE } from '../../../support/constants';
import { test, expect } from '../../baset-test';

test.describe('ADO-36567 Domain Table Status', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('Domain Table Status', async ({ page, banner, assetPage, mock, fxAssets, fxDomains }) => {
    const asset = fxAssets.generateAssets();
    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(fxDomains.generateDefaultDomains(), `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
  });

  test('verify domain status chips color', async ({ assetPage }) => {
    const currentStatusSuccessColor = await assetPage.getDomainChipColor('Good');
    // const forecastStatusSuccessColor = await assetPage.getDomainChipColor('On Track'); enable after H2O 1.0 Release
    const currentStatusErrorColor = await assetPage.getDomainChipColor('Threshold');
    // const forecastStatusErrorColor = await assetPage.getDomainChipColor('Off Track'); enable after H2O 1.0 Release
    const currentStatusWarningColor = await assetPage.getDomainChipColor('Trigger');
    // const forecastStatusWarningColor = await assetPage.getDomainChipColor('At Risk'); enable after H2O 1.0 Release

    expect(currentStatusSuccessColor, `Domain current status success color is green ${currentStatusSuccessColor}`).toBe('rgb(0, 116, 97)');
    // expect(forecastStatusSuccessColor, `Domain forecast status success  color is green ${forecastStatusSuccessColor}`).toBe('rgb(0, 116, 97)'); enable after H2O 1.0 Release
    expect(currentStatusErrorColor, `Domain current status error color is red ${currentStatusErrorColor}`).toBe('rgb(202, 35, 32)');
    // expect(forecastStatusErrorColor, `Domain forecast status error color is red ${forecastStatusErrorColor}`).toBe('rgb(202, 35, 32)'); enable after H2O 1.0 Release
    expect(currentStatusWarningColor, `Domain current status warning color is orange ${currentStatusWarningColor}`).toBe('rgb(191, 77, 0)');
    // expect(forecastStatusWarningColor, `Domain forecast status warning color is orange ${forecastStatusWarningColor}`).toBe('rgb(191, 77, 0)'); enable after H2O 1.0 Release
  });
  test('verify sub domain status chips color', async ({ assetPage, fxDomains }) => {
    const domains = fxDomains.generateDefaultDomains();
    const domain = domains.domains.filter((e) => e.nodeType === 'Domain');
    await assetPage.expandDomainSubDomain(`${domain.at(0)?.name}`);
    await assetPage.expandDomainSubDomain(`${domain.at(1)?.name}`);
    await assetPage.expandDomainSubDomain(`${domain.at(2)?.name}`);
    const currentStatusSuccessColor = await assetPage.getSubdomainChipColor('Good');
    // const forecastStatusSuccessColor = await assetPage.getSubdomainChipColor('On Track'); enable after H2O 1.0 Release
    const currentStatusErrorColor = await assetPage.getSubdomainChipColor('Threshold');
    // const forecastStatusErrorColor = await assetPage.getSubdomainChipColor('Off Track'); enable after H2O 1.0 Release
    const currentStatusWarningColor = await assetPage.getSubdomainChipColor('Trigger');
    // const forecastStatusWarningColor = await assetPage.getSubdomainChipColor('At Risk'); enable after H2O 1.0 Release

    expect(currentStatusSuccessColor, `Sub-domain current status success color is light green ${currentStatusSuccessColor}`).toBe('rgb(230, 241, 239)');
    // expect(forecastStatusSuccessColor, `Sub-domain forecast status success color is light green ${forecastStatusSuccessColor}`).toBe('rgb(230, 241, 239)'); enable after H2O 1.0 Release
    expect(currentStatusErrorColor, `Sub-domain current status error color is light red ${currentStatusErrorColor}`).toBe('rgb(250, 233, 233)');
    // expect(forecastStatusErrorColor, `Sub-domain forecast status error color is light red ${forecastStatusErrorColor}`).toBe('rgb(250, 233, 233)'); enable after H2O 1.0 Release
    expect(currentStatusWarningColor, `Sub-domain current status warning color is light orange ${currentStatusWarningColor}`).toBe('rgb(255, 248, 225)');
    // expect(forecastStatusWarningColor, `Sub-domain forecast status warning color is light orange ${forecastStatusWarningColor}`).toBe('rgb(255, 248, 225)'); enable after H2O 1.0 Release
  });
});
