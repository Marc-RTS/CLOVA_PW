import { HOMEPAGE_TITLE, STATUSETYPES } from '../../support/constants';
import { test, expect } from '../baset-test';

test.describe('ADO-31546 View Domain Page', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });

  test.beforeEach('View Domain Page', async ({ page, banner, assetPage, mock, fxAssets, fxDomains }) => {
    const asset = fxAssets.generateAssets();
    await mock.getAssets(asset, `${asset.id}`);
    await mock.getDomains(fxDomains.generateDefaultDomains(), `${asset.id}`);
    await page.goto('/');
    await page.waitForURL('**/assets/**');
    await assetPage.waitForDomainTableToBeLoaded();
    await expect(await banner.getBanner()).toHaveText(HOMEPAGE_TITLE);
    await assetPage.waitForDomainTableToBeLoaded();
  });

  test('User can view domains in the domain table', async ({ assetPage, fxDomains }) => {
    const domains = fxDomains.generateDefaultDomains().domains.filter((e) => e.nodeType === 'Domain');

    domains.forEach(async (a) => {
      await expect(await assetPage.getAsset(`${a?.name}`)).toBeVisible();
    });
  });
  test.skip('User can view sub-domains in the domain table', async ({ assetPage, fxDomains }) => {
    const domains = fxDomains.generateDefaultDomains().domains.filter((e) => e.nodeType === 'Domain');
    const subDomains = fxDomains.generateDefaultDomains().domains.filter((e) => e.nodeType === 'Subdomain');

    for (const domain of domains) {
      if (subDomains.find((sd) => sd.path.includes(domain.name))) {
        await assetPage.expandDomainSubDomain(`${domain.name}`);
        const sd = subDomains.filter((s) => s.path.includes(`${domain.name}`));
        for (const s of sd) {
          const x = await assetPage.getSubDomainRow(`${s.name}`);
          await expect(x).toBeVisible();
        }
      }
    }
  });
  test('User can view the status for domain', async ({ assetPage, fxDomains }) => {
    const domains = fxDomains.generateDefaultDomains().domains.filter((e) => e.nodeType === 'Domain');
    for (const domain of domains) {
      await expect(await assetPage.getAssetCurrentStatus(`${domain?.name}`)).toHaveText(STATUSETYPES[`${domain?.currentStatusId}`]);
      await expect(await assetPage.getAssetForecastStatus(`${domain?.name}`)).toHaveText(STATUSETYPES[`${domain?.forecastStatusId}`]);
    }
  });
});
