import { ICriteria } from '../../../../fixtures/interfaces';
import { test, expect } from '../../../../ui/specs/baset-test';
import { API_TOKEN_PATH } from '../../../../ui/support/constants';
import fs from 'fs';

test.describe('Criteria', () => {
  const apiToken = fs.readFileSync(API_TOKEN_PATH, 'utf-8');
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  test('test criteria response to be ok 200', async ({ request, fxDomains }) => {
    const domain = fxDomains.generateDefaultDomains().domains.find((e) => e.nodeType === 'Theme');

    const response = await request.get(`api/Criteria/${domain?.id}`);
    expect(response).toBeOK();
    expect(response.status()).toBe(200);
  });
  test('test criteria schema response', async ({ request, fxDomains }) => {
    const domain = fxDomains.generateDefaultDomains().domains.find((e) => e.nodeType === 'Theme');
    const response = await request.get(`api/Criteria/${domain?.id}`);
    expect(response).toBeOK();

    const body: ICriteria = await response.json();
    body.criteria.forEach((c) => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('statusId');
      expect(c).toHaveProperty('lastMetric');
      expect(c).toHaveProperty('trigger');
      expect(c).toHaveProperty('threshold');
      expect(c).toHaveProperty('yMax');
      expect(c).toHaveProperty('yMin');
    });
  });
  test.fixme('test criteria not found response', async ({ request }) => {
    const invalidId = 999;
    const response = await request.get(`api/Criteria/${invalidId}`);
    expect(response.status()).toEqual(404);
    const body = await response.json();

    expect(body).toHaveProperty('title', 'Resource not found.');
    expect(body).toHaveProperty('status', 404);
    expect(body).toHaveProperty('detail', `Next error(s) occurred:* Id ${invalidId}: Criteria not found\n`);
  });
});
