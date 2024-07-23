import { test, expect } from '../../../ui/specs/baset-test';
import { IDomains } from '../../../fixtures/interfaces';
import { API_TOKEN_PATH } from '../../../ui/support/constants';
import fs from 'fs';

const water = 1;
const geoTechnical = 2;
const rehabilitation = 3;
test.describe('Domains', () => {
  const apiToken = fs.readFileSync(API_TOKEN_PATH, 'utf-8');
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  test('test domains response to be ok 200', async ({ request, fxAssets }) => {
    const asset = fxAssets.generateAssets();

    const response = await request.get(`api/Assets/${asset.id}/Domains`);
    expect(response).toBeOK();
    expect(response.status()).toBe(200);
  });
  test('test domains schema response', async ({ request, fxAssets }) => {
    const asset = fxAssets.generateAssets();
    const response = await request.get(`api/Assets/${asset.id}/Domains?themeTypeIds=${water}&themeTypeIds=${rehabilitation}`);

    expect(response).toBeOK();
    const body: IDomains = await response.json();

    body.domains.forEach((d) => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('path');
      expect(d).toHaveProperty('nodeType');
      expect(d).toHaveProperty('name');
      expect(d).toHaveProperty('currentStatusId');
      expect(d).toHaveProperty('forecastStatusId');
      expect(d).toHaveProperty('themeTypeId');
      expect(d).toHaveProperty('domainCode');
      expect(d).toHaveProperty('updatedOn');
      expect(d).toHaveProperty('geoLocation');
    });
  });
  test('test domain filter geoTechnical & rehabilitation response', async ({ request, fxAssets }) => {
    const asset = fxAssets.generateAssets();
    const response = await request.get(`api/Assets/${asset.id}/Domains?themeTypeIds=${geoTechnical}&themeTypeIds=${rehabilitation}`);
    expect(response).toBeOK();

    //test response body themetype id values should be 2, 3 or null only
    const body: IDomains = await response.json();
    body.domains.forEach((d) => {
      expect(
        [geoTechnical, rehabilitation, null],
        `Domain Theme Type Id ${d.themeTypeId} is equal to ${geoTechnical} or ${rehabilitation} or null only`
      ).toContain(d.themeTypeId);
    });
  });
  test('test domain filter water & rehabilitation response', async ({ request, fxAssets }) => {
    const asset = fxAssets.generateAssets();
    const response = await request.get(`api/Assets/${asset.id}/Domains?themeTypeIds=${water}&themeTypeIds=${rehabilitation}`);
    expect(response).toBeOK();

    //test response body themetype id values should be 1, 3 or null only
    const body: IDomains = await response.json();
    body.domains.forEach((d) => {
      expect([water, rehabilitation, null], `Domain Theme Type Id ${d.themeTypeId} is equal to ${water} or ${rehabilitation} or null only`).toContain(
        d.themeTypeId
      );
    });
  });
  test('test domain filter water only response', async ({ request, fxAssets }) => {
    const asset = fxAssets.generateAssets();
    const response = await request.get(`api/Assets/${asset.id}/Domains?themeTypeIds=${water}`);
    expect(response).toBeOK();

    //test response body themetype id values should be 1, 3 or null only
    const body: IDomains = await response.json();
    body.domains.forEach((d) => {
      expect([water, null], `Domain Theme Type Id ${d.themeTypeId} is equal to ${water} or null only`).toContain(d.themeTypeId);
    });
  });
  test('test domain filter theme type supplied not exists', async ({ request, fxAssets }) => {
    const asset = fxAssets.generateAssets();
    const response = await request.get(`api/Assets/${asset.id}/Domains?themeTypeIds=99`);
    expect(response).toBeOK();

    //test response body themetype id values should be null only
    const body: IDomains = await response.json();
    body.domains.forEach((d) => {
      expect([null], `Domain Theme Type Id ${d.themeTypeId} of ${d.name} is equal to null only`).toContain(d.themeTypeId);
    });
  });
});
