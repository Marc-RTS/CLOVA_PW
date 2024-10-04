import { test, expect } from '../../baset-test';

test.describe('ADO-43291 Toggle Forecast Mode In Map View', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/serviceAccountStd.json' });
  test.beforeEach('Toggle Forecast Mode In Map View', async ({ page, banner }) => {
    await page.goto('/');
    await expect(await banner.getBanner()).toHaveText('Clova');
  });
  test.fixme('User can always see one active toggle view mode in Map View', async ({ page }) => {});
  test.fixme('User is not able to see current/forecast pill in Table View', async ({ page }) => {});
  test.fixme('User able to toggle forecast mode', async ({ page }) => {});
  test.fixme('User able to toggle current mode', async ({ page }) => {});
  test.fixme('User able to toggle forecast mode in criteria insight panel in Map View', async ({ page }) => {});
  test.fixme('User able to see tooltip on hover of the current/forecast toggle button', async ({ page }) => {});
  test.fixme('User able to see current/forecast pill will move when no theme filter is selected', async ({ page }) => {});
  test.fixme('User able to see current/forecast pill will move back when theme filter is selected', async ({ page }) => {});
  test.fixme('User able to see criteria insight panel components reflect the active mode on the map icon they select', async ({ page }) => {});
  test.fixme('User able to see criteria insight panel components reflect the active mode in the Map', async ({ page }) => {});
});
