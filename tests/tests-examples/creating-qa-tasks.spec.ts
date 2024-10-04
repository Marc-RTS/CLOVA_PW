import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test.skip('test create testing tasks', async ({ page }) => {
  const tasks = ['[QA] Test design', '[QA] Test execution', '[QA] Test exploratory', '[QA] Automation'];
  await page.goto('https://ist-pandsd.visualstudio.com/CLOVA/_dashboards/dashboard/198ab6b3-5e0a-4a1f-b4dc-2641767e6cd2');
  const headerTestingTasks = await page.getByRole('heading', { name: 'Stories in current iteration' }).innerText({ timeout: 60000 });
  const numberOfMissingTestingTasks = headerTestingTasks.split('Stories in current iteration missing Testing Tasks (');
  const num = numberOfMissingTestingTasks.at(0) ?? '';
  // TODO loop num
  for (let index = 0; index < parseInt(num); index++) {
    await page.getByRole('row').nth(index).click();
    for (let index1 = 0; 1 < tasks.length; index1++) {
      await page.locator('#vss_70').getByRole('button', { name: 'Add link' }).click();
      await page.getByLabel('New item').click();
      await page.getByRole('heading', { name: 'Add link' }).click();
      await page.getByRole('textbox', { name: 'Title', exact: true }).click();
      await page.getByRole('textbox', { name: 'Title', exact: true }).click();
      await page.getByRole('textbox', { name: 'Title', exact: true }).fill(tasks[index1]);
      await page.getByRole('textbox', { name: 'Title', exact: true }).click();
      await page.getByLabel('Comment', { exact: true }).click();
      await page.getByLabel('Comment', { exact: true }).click();
      await page.getByRole('button', { name: 'OK', exact: true }).click();
      expect(await page.getByLabel(`New Task 1*: ${tasks[index1]}`).isVisible()).toBeTruthy();
      await page.getByLabel(`New Task 1*: ${tasks[index1]}`).getByLabel('Selected identity').fill('');
      await page.getByLabel(`New Task 1*: ${tasks[index1]}`).getByRole('button', { name: 'Save & Close' }).click();
    }
  }
});
