import { IMetrics } from '../../../../fixtures/interfaces';
import { test, expect } from '../../../../ui/specs/baset-test';
import { API_TOKEN_PATH } from '../../../../ui/support/constants';
import fs from 'fs';

test.describe('Metrics', () => {
  const apiToken = fs.readFileSync(API_TOKEN_PATH, 'utf-8');
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  test('test metrics response to be ok 200', async ({ request, fxWaterCriteria }) => {
    const waterCriteria = fxWaterCriteria.generateWaterCriteria().criteria.at(0);
    const response = await request.get(`api/Criteria/${waterCriteria?.id}/Metrics`);

    expect(response).toBeOK();
    expect(response.status()).toBe(200);
  });
  test('test metrics schema response', async ({ request, fxWaterCriteria }) => {
    const waterCriteria = fxWaterCriteria.generateWaterCriteria().criteria.at(0);
    const response = await request.get(`api/Criteria/${waterCriteria?.id}/Metrics`);

    const body: IMetrics = await response.json();
    expect(response).toBeOK();
    body.metrics.forEach((c) => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('date');
      expect(c).toHaveProperty('statusId');
      expect(c).toHaveProperty('value');
    });
  });
  test('test metrics not found response', async ({ request }) => {
    const invalidId = 999;
    const response = await request.get(`api/Criteria/${invalidId}/Metrics`);
    expect(response.status()).toEqual(404);
    const body = await response.json();

    expect(body).toHaveProperty('title', 'Resource not found.');
    expect(body).toHaveProperty('status', 404);
    expect(body).toHaveProperty('detail', `Next error(s) occurred:* Id ${invalidId}: Criteria not found\n`);
  });
  test.fixme('test metrics dates are on sundays', async ({ request, fxWaterCriteria }) => {
    const waterCriteria = fxWaterCriteria.generateWaterCriteria().criteria.at(0);
    const response = await request.get(`api/Criteria/${waterCriteria?.id}/Metrics`);

    // const body: IMetrics = await response.json();
    // expect(response).toBeOK();
    // body.metrics.forEach((c) => {
    //   expect(c).toHaveProperty('id');
    //   expect(c).toHaveProperty('date');
    //   expect(c).toHaveProperty('statusId');
    //   expect(c).toHaveProperty('value');
    // });
  });
});
