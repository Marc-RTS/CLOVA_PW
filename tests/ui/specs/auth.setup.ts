import { test as setup } from '../specs/baset-test';
import { STANDARD, SERVICE_ACCOUNT_STD } from '../support/constants';
import fs from 'fs';
import Auth from '../support/authenticate';

//move to constants
const standardUser = 'tests/ui/utils/.auth/standardUser.json';
const serviceAccountStdUser = 'tests/ui/utils/.auth/serviceAccountStd.json';
const apiToken = 'tests/ui/utils/.auth/apiToken.json';

setup('authenticate as service account user', async ({ loginPage, page, auth }) => {
  const page1 = await loginPage.loginToActiveDirectory(SERVICE_ACCOUNT_STD, page);
  await page1.context().storageState({ path: serviceAccountStdUser });
  const sessionStorage = await page1.evaluate(() => JSON.stringify(sessionStorage));
  fs.writeFileSync(apiToken, JSON.stringify(sessionStorage), 'utf-8');
  const token = await auth.getToken(apiToken);
  fs.writeFileSync(apiToken, token, 'utf-8');
  await page1.close();
});

//TODO authenticate thru azure via api

// setup('authenticate as standard user', async ({ loginPage }) => {
// const page = await loginPage.loginToActiveDirectory(STANDARD);
// await page.context().storageState({ path: standardUser });
// const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
// fs.writeFileSync(apiToken, JSON.stringify(sessionStorage), 'utf-8');
// const auth = new Auth();
// const token = await auth.getToken(apiToken);
// fs.writeFileSync(apiToken, token, 'utf-8');
// await page.close();
// });
