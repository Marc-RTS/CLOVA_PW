import { test, expect } from '../../../ui/specs/baset-test';
import { API_TOKEN_PATH } from '../../../ui/support/constants';
import fs from 'fs';

test.describe('Assets', () => {
  const apiToken = fs.readFileSync(API_TOKEN_PATH, 'utf-8');
  test.use({
    extraHTTPHeaders: {
      Accept: '*/*',
      Authorization: `Bearer ${apiToken}`,
    },
    ignoreHTTPSErrors: true,
  });
  test('test asset response to be ok 200', async ({ request, fxAssets }) => {
    const asset = fxAssets.generateAssets();
    const response = await request.get(`api/Assets/${asset.id}`);

    expect(response).toBeOK();
    expect(response.status()).toBe(200);

    //test response body schema and values if fields and values are strictly equal
    const responseJson = await response.json();
    expect(asset, `Assets response is equal to ${JSON.stringify(asset)}`).toStrictEqual(responseJson);
  });
  test('test asset schema response', async ({ request, fxAssets }) => {
    const asset = fxAssets.generateAssets();
    const response = await request.get(`api/Assets/${asset.id}`);

    expect(response).toBeOK();

    //test response body schema and values if fields and values are strictly equal
    expect(await response.json()).toHaveProperty('assetTypeId');
    expect(await response.json()).toHaveProperty('completionDate');
    expect(await response.json()).toHaveProperty('id');
    expect(await response.json()).toHaveProperty('version');
    expect(await response.json()).toHaveProperty('versionDate');
    expect(await response.json()).toHaveProperty('visibilityId');
  });
  test('test asset not found response', async ({ request }) => {
    const invalidId = 999;
    const response = await request.get(`api/Assets/${invalidId}`);

    expect(response.status()).toBe(404);
    const body = await response.json();

    expect(body).toHaveProperty('title', 'Resource not found.');
    expect(body).toHaveProperty('status', 404);
  });
});
