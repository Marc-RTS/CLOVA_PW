import { test, expect } from '../../../ui/specs/baset-test';
import { IMetadata } from '../../../fixtures/interfaces';
import { API_TOKEN_PATH } from '../../../ui/support/constants';
import fs from 'fs';

test.describe('Metadata', () => {
  const apiToken = fs.readFileSync(API_TOKEN_PATH, 'utf-8');
  test.use({
    extraHTTPHeaders: {
      Accept: '*/*',
      Authorization: `Bearer ${apiToken}`,
    },
    ignoreHTTPSErrors: true,
  });
  test('test metadata response to be ok 200', async ({ request, fxMetadata }) => {
    const response = await request.get(`api/Metadata`);
    expect(response).toBeOK();
    expect(response.status()).toBe(200);

    //test response body schema and values if fields and values are strictly equal
    const responseJson = await response.json();
    const metadata = fxMetadata.generateMetadata();
    expect(metadata, `Metadata response is equal to ${JSON.stringify(metadata)}`).toStrictEqual(responseJson);
  });
  test('test metadata schema response', async ({ request }) => {
    const response = await request.get(`api/Metadata`);
    expect(response).toBeOK();

    const body: IMetadata = await response.json();

    body.assetTypes.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('value');
    });

    body.metricTypes.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('value');
      expect(d).toHaveProperty('themeId');
    });
    body.ruleComparisonTypes.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('value');
    });
    body.ruleDataTypes.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('value');
    });
    body.ruleTypes.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('value');
    });
    body.statusTypes.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('value');
    });
    body.themeTypes.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('value');
    });
    body.visibilityTypes.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('value');
    });
  });
});
